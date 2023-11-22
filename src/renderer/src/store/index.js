import { defineStore } from 'pinia'

//平台
export const usePlatformStore = defineStore('platform', {
  state: () => {
    return {
      platFromlists: [] //激活的平台数据
    }
  },
  getters: {},
  actions: {
    setPlatformList(list) {
      this.platFromlists = list
      // console.log(this.platFromlists, 'fdfdf')
    },
    //增加子侧边栏
    editPlatformList(key, userName) {
      // console.log(userName, 'dddddd')
      this.platFromlists.forEach((item) => {
        if (item.name == key) {
          item.children.push(userName)
        }
      })
      // console.log(this.platFromlists, 'aaaaaaa')
    },

    //删除子侧边栏
    delePlatformList(key, userName) {
      // console.log(key, userName, 'dddddd')
      this.platFromlists.forEach((item) => {
        if (item.name == key) {
          item.children.forEach((item2, index) => {
            if (item2 == userName) {
              item.children.splice(index, 1)
            }
          })
        }
        console.log(item.name, 'item.name')
      })
    }
  },
  // persist: {
  //   storage: window.sessionStorage
  // }
  persist: true
})
