import path from 'path'
import { app, dialog, BrowserWindow } from 'electron'

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
    //  else {
    //   window.webContents.send('info', path.join(__dirname, '../app-update.yml'))
    //   // autoUpdater.updateConfigPath = path.join(__dirname, '../app-update.yml')
    // }

    logger.transports.file.level = 'debug'
    autoUpdater.logger = logger
    autoUpdater.disableWebInstaller = true
    // 关掉自动下载，如果需要也可以打开，我这里不需要
    autoUpdater.autoDownload = false

    //发现了有新版本
    autoUpdater.on('update-available', () => {
      dialog
        .showMessageBox({
          type: 'info',
          title: '软件更新',
          message: '发现新版本, 确定更新?',
          buttons: ['取消', '确定']
        })
        .then((resp) => {
          // console.log(resp, 'resp')
          if (resp.response === 1) {
            // createWindow(window)
            autoUpdater.downloadUpdate()
          }
        })
      // window.webContents.send('downloadProgress', ['2222'])
    })
    // 没有更新
    autoUpdater.on('update-not-available', () => {
      dialog.showMessageBox({
        type: 'info',
        title: '提示',
        message: '当前版本已经是最新版本，无需更新',
        buttons: ['确定']
      })
    })

    // function createWindow(window, e) {
    //   const updateWindow = new BrowserWindow({
    //     width: 500,
    //     height: 200,
    //     parent: window,
    //     autoHideMenuBar: true,
    //     ...(process.platform === 'linux'
    //       ? {
    //           icon: path.join(__dirname, '../../build/icon.png')
    //         }
    //       : {}),
    //     webPreferences: {
    //       preload: path.join(__dirname, '../preload/index.js'),
    //       sandbox: false,
    //       plugins: true,
    //       webSecurity: false,
    //       nodeIntegration: true,
    //       contextIsolation: false
    //     }
    //   })
    //   updateWindow.on('ready-to-show', () => {
    //     updateWindow.show()
    //   })

    //   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    //     updateWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/update')
    //   } else {
    //     updateWindow.loadFile('app://./index.html')
    //   }

    //   // updateWindow.loadFile('app://./index.html')
    //   if (e) {
    //     updateWindow.webContents.send('error', e)
    //   }
    // }

    autoUpdater.on('error', (e) => {
      // createWindow(window, e)
      // console.log(e, 'eee')
      window.webContents.send('info', e)
    })

    // 软件正在下载更新中...
    autoUpdater.on('download-progress', (progressInfo) => {
      // console.log(progressInfo.percent, '888888')
      // updateWindow.webContents.send('downloadProgress', progressInfo)
    })

    //更新下载完成
    autoUpdater.on('update-downloaded', () => {
      dialog
        .showMessageBox(window, {
          title: '安装新版本',
          message: '新版本已下载完成，是否立即安装？',
          type: 'info',
          buttons: ['否，暂时不安装', '是，立即安装']
        })
        .then((resp) => {
          // 退出开始直接安装
          if (resp.response === 1) {
            autoUpdater.quitAndInstall()
          }
        })
    })
  }

  start() {
    // 非打包情况下，下面的函数不起作用，开发环境要用checkForUpdates()，但是这个函数有点烦。

    autoUpdater.checkForUpdatesAndNotify()

    // autoUpdater.checkForUpdates()
  }
}
