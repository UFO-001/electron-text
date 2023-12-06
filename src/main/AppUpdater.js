import path from 'path'
import { app, dialog } from 'electron'

import logger from 'electron-log'
//使应用程序能够自动更新
import { autoUpdater } from 'electron-updater'
import { is } from '@electron-toolkit/utils'

export default class AppUpdater {
  constructor(window) {
    if (is.dev) {
      console.log(is.dev, 'is.dev')
      Object.defineProperty(app, 'isPackaged', {
        get() {
          return true
        }
      })
      autoUpdater.updateConfigPath = path.join(__dirname, '../../dev-app-update.yml')
    }

    logger.transports.file.level = 'debug'
    autoUpdater.logger = logger
    autoUpdater.disableWebInstaller = true
    // 关掉自动下载，如果需要也可以打开，我这里不需要
    autoUpdater.autoDownload = false

    //发现了有新版本
    autoUpdater.on('update-available', () => {
      dialog.showMessageBox({
        title: '提示',
        message: '发现新版本，准备下载'
      })
    })
    //没有更新
    autoUpdater.on('update-not-available', () => {
      dialog.showMessageBox({
        title: '提示',
        message: '当前版本已经是最新版本，无需更新'
      })
    })

    autoUpdater.on('error', (e) => {})

    //软件正在下载更新中...
    autoUpdater.on('download-progress', (progressInfo) => {
      console.log(progressInfo.percent)
      window.webContents.send('main-to-renderer', {
        name: 'download-progress',
        event: 'event',
        msg: '正在下载',
        data: progressInfo.percent
      })
    })
    //更新下载完成
    autoUpdater.on('update-downloaded', () => {
      window.webContents.send('main-to-renderer', {
        name: 'update-downloaded',
        event: 'event',
        msg: '下载完成，准备安装',
        data: null
      })
      dialog
        .showMessageBox(window, {
          title: '安装新版本',
          message: '新版本已下载完成，是否立即安装？',
          type: 'info',
          buttons: ['是，立即安装']
        })
        .then(() => {
          // 退出开始直接安装
          autoUpdater.quitAndInstall()
        })
    })

    // 非打包情况下，下面的函数不起作用，开发环境要用checkForUpdates()，但是这个函数有点烦。
    autoUpdater.checkForUpdatesAndNotify()
  }

  start() {
    autoUpdater.downloadUpdate()
  }
}
