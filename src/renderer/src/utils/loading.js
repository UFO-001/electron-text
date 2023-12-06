let loadingBoolean = null
let loadingNumber = 0

//引入一个工具库lodash
import _ from 'lodash'

//显示loading
const showLoading = () => {
  if (loadingNumber == 0) {
    loadingBoolean = ElLoading.service({ fullscreen: true })
  }
  loadingNumber++
}

//在一定时间内，关掉所有的loading
const newHideLoading = _.debounce(() => {
  if (loadingBoolean) {
    loadingBoolean.close()
    loadingBoolean = null
  }
}, 1000)

//隐藏loading
const hideLoading = () => {
  loadingNumber--
  loadingNumber = Math.max(loadingNumber, 0)
  if (loadingNumber == 0) {
    // loadingBoolean.close()
    newHideLoading()
  }
}

export { showLoading, hideLoading }
