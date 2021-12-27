const inquirer = require('inquirer')
const fse = require('fs-extra')
const path = require('path')
const Generator = require('./Generator')


module.exports = async (name, options) => {
 // 当前命令行选择的目录
 const cwd  = process.cwd();
 // 需要创建的目录地址
 const targetDir  = path.join(cwd, name)

 
 // 目录是否已经存在？
 if (fse.existsSync(targetDir)) {
   // 是否为强制创建？
    if (options.force) {
      await fse.remove(targetDir)
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },{
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fse.remove(targetDir)
        console.log(`\rCreateNew...`)
        fse.mkdirSync(targetDir)
      }
    }
  } else {
    const generator = new Generator(name, targetDir)
    generator.create()
  }
}