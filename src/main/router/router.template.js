import EventRoute from './EventRoute'
import { screen, ipcMain } from 'electron'

const routers = new Array()

/**
 *  关闭窗口
 */
routers.push(
  new EventRoute('close-window', 'event', (api, data = {}) => {
    api.app.quit()
  })
)

/**
 *  打开一个文件
 */
routers.push(
  new EventRoute('open-window', 'event', (api, data = {}) => {
    api.dialog.showOpenDialog()
    console.log(data, 'data')
  })
)
/**
 *  最小化窗口
 */
routers.push(
  new EventRoute('min-window', 'event', (api, data = {}) => {
    api.window.minimize()
  })
)

/**
 *  最大化窗口
 */
routers.push(
  new EventRoute('max-window', 'event', (api, data = {}) => {
    if (api.window.isMaximized()) {
      api.window.unmaximize()
      api.window.frame = false
    } else {
      api.window.frame = true
      api.window.maximize()
    }
  })
)

/**
 *  窗口置顶
 */
routers.push(
  new EventRoute('top-window', 'event', (api, data = {}) => {
    if (api.window.isAlwaysOnTop()) {
      api.window.setAlwaysOnTop(false)
    } else {
      api.window.setAlwaysOnTop(true)
    }
    // console.log(api.window.isAlwaysOnTop(), ' top-window')
  })
)

export default routers
