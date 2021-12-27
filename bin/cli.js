#! /usr/bin/env node
// const path = require('path')
// const ejs = require('ejs')
const chalk = require('chalk')
const figlet = require('figlet');
const { Command } = require('commander');

const program = new Command();
program
.version(`v${require('../package.json').version}`)
.usage('<command> [option]')
.command('create <name>')
.option('-f, --force', 'overwrite target directory if it exist')
.description('create a new project')
.action((name, options) => require('../lib/create.js')(name, options))

program.on('--help', () => {
  console.log(
    figlet.textSync('ank-cli',{
      font: 'Star Wars',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
  )
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`)
})

program.parse(process.argv)

// 生成文件
// const cwdUrl = process.cwd();
// const destUrl = path.join(cwdUrl, 'templates'); 
// fs.readdir(destUrl, (err, files) => {
//   if (err) throw err
//   files.forEach((file) => {
//     // 使用 ejs 渲染对应的模版文件
//     // renderFile（模版文件地址，传入渲染数据）
//     ejs.renderFile(path.join(destUrl, file), {name: 123}).then(data => {
//       // 生成 ejs 处理后的模版文件
//       fs.writeFileSync(path.join(cwdUrl, file), data)
//     })
//   })
// })
