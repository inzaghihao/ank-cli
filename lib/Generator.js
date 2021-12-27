const ora = require('ora')
const inquirer = require('inquirer')
const downloadGitRepo = require('download-git-repo')
const util = require('util')
const path = require('path')
const chalk = require('chalk')

async function Loading(fn, message, ...args) {
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();
  try {
    // 执行下载模板方法
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...'+ error)
    return false
  } 
}

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }
  // 核心创建逻辑
  async create(){
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: [
        'vite-h5',
        'vite-vue3-ts'
      ],
      message: 'Please choose a template to create project'
    })
    const downLoadFn = util.promisify(downloadGitRepo)
    if(repo === 'vite-h5'){
      const isSuccess = await Loading(
        downLoadFn, // 远程下载方法
        'waiting download template', // 加载提示信息
        'inzaghihao/vite-h5', // 下载地址
        path.resolve(process.cwd(), this.targetDir))
      if(isSuccess){
        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
        console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
        console.log('  npm run dev\r\n')
      }else{
        console.log('\r\n  create fail\r\n')
      }
    } else{
      console.log(`\r\n 暂无模板 ${chalk.cyan(repo)}`)
    }
  }
}

module.exports = Generator;