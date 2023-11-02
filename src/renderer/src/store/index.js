import { defineStore } from 'pinia'

//平台
export const usePlatformStore = defineStore('platform', {
  state: () => {
    return {
      platFromlists: []
    }
  },
  getters: {},
  actions: {
    setPlatformList(list) {
      this.platFromlists = list
      console.log(this.platFromlists, 'fdfdf')
    },
    editPlatformList(key, userName) {
      console.log(key, userName, 'dddddd')
      this.platFromlists.forEach((item) => {
        if (item.name == key) {
          item.children.push(userName)
        }
        console.log(item.name, 'item.name')
      })
      console.log(this.platFromlists, 'aaaaaaa')
    }
  },
  persist: true
})
