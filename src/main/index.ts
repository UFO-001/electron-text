import { app, shell, BrowserWindow, ipcMain, dialog, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

//引入封装组件
import EventRouter from './router/EventRouter.js'
import routers from './router/router.template.js'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    frame: false,

    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      plugins: true,
      nodeIntegration: true,
      contextIsolation: false,
      allowRunningInsecureContent: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      webviewTag: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    // console.log(mainWindow.id, 'idididid')
  })

  // const view = new BrowserView()
  // view.setBounds({ x: 300, y: 200, width: 500, height: 500 })
  // mainWindow.setBrowserView(view)
  // view.webContents.loadURL('https://baidu.com')
  //封装过后的关闭窗口

  const eventRouter = new EventRouter()
  eventRouter.addApi('app', app)
  eventRouter.addApi('dialog', dialog)
  // eventRouter.addApi('window', mainWindow)
  eventRouter.addApi('contextMenu', contextMenu)

  eventRouter.addRoutes(routers)
  //接收渲染进程的参数
  let count = 0
  ipcMain.on('renderer-to-main', (e, data) => {
    const win = BrowserWindow.fromId(mainWindow.id)
    const win2 = BrowserWindow.getFocusedWindow()
    if (win !== null && count === 0 && win == win2) {
      // console.log(mainWindow.id, win !== null && count === 0 && win == win2, count, 'ssssss')
      count = 1
      eventRouter.addApi('window', win)

      eventRouter.router(data)
      setTimeout(() => {
        count = 0
      }, 1000)
    }
    //data就是渲染进程传过来的参数
    // console.log(mainWindow.id, 'dddddd')
  })

  // 拖拽事件
  ipcMain.on('move-application', (e, data) => {
    const win = BrowserWindow.fromId(mainWindow.id)
    const win2 = BrowserWindow.getFocusedWindow()
    // console.log(win == win2)
    if (win !== null && win == win2) {
      const [x, y] = mainWindow.getPosition()
      win?.setPosition(x + data.posX, y + data.posY)
    }

    // console.log(x, y, 'uuuuuu')

    //data就是渲染进程传过来的参数
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  //系统托盘
  const tray = new Tray(join(__dirname, '../../icon.ico'))
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// ipcMain.handle('open-file-dialog', () => {
//   const win = new BrowserWindow({
//     width: 1100,
//     height: 750,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//       allowRunningInsecureContent: true,
//       nodeIntegrationInWorker: true,
//       nodeIntegrationInSubFrames: true,
//       plugins: true
//     }
//   })

//   win.webContents.session.loadExtension(join(app.getPath('desktop'), '/10.2.0.9952_0'))
//   win.webContents.session.on('extension-ready', (e, ex) => {
//     // console.log(ex.path, ex.url, 'lllllllllllllllllllllllllllllllllllllllll')
//     win.loadURL(ex.url + 'browserActionPopup.html')
//   })
//   // win.loadURL('chrome-extension://lifbcibllhkdhoafpjfnlhfpfgnpldfl/browserActionPopup.html')
// })

//系统托盘菜单
const contextMenu = Menu.buildFromTemplate([
  {
    label: '多用户',
    submenu: [
      {
        label: '用户1',
        id: 'user1',
        click: () => {
          createWindow()
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          contextMenu.getMenuItemById('user1')!.enabled = false
        }
      },
      {
        label: '用户2',
        id: 'user2',
        click: () => {
          createWindow()
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          contextMenu.getMenuItemById('user2')!.enabled = false
        }
      }
    ]
  },
  { label: '版本号3.3.5', enabled: false },
  {
    label: '帮助文档',
    click: () => {
      shell.openExternal('https://haixiang.app/#/help')
    }
  },
  {
    label: '开发者工具',

    submenu: [
      {
        label: '移除代理设置',
        type: 'normal'
      }
    ]
  },
  { type: 'separator' },
  { label: '退出', type: 'normal', role: 'quit' }
])
