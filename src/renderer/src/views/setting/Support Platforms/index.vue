<template>
  <div class="platFrom">
    <ul>
      <li v-for="(item, index) in platFrom" :key="index">
        <div class="PF1">
          <input
            type="checkbox"
            :checked="item.checked"
            :name="item.name"
            :imgUrl="item.imgUrl"
            @click="change"
            :id="item.name"
          />
          <label :for="item.name">
            <img :src="item.imgUrl" alt="" />
            <span>{{ item.name }}</span>
          </label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onActivated, watch, nextTick, watchEffect } from 'vue'

//平台列表
const platFrom = reactive([
  {
    name: 'Zalo',
    imgUrl: '/src/assets/PlatformsImage/Zalo.png',
    checked: false
  },
  {
    name: 'Whatsapp',
    imgUrl: '/src/assets/PlatformsImage/Whatsapp.png',
    checked: false
  },
  {
    name: 'Telegram',
    imgUrl: '/src/assets/PlatformsImage/Telegram.png',
    checked: false
  },
  {
    name: 'Skype',
    imgUrl: '/src/assets/PlatformsImage/Skype.png',
    checked: false
  },
  {
    name: 'Meta',
    imgUrl: '/src/assets/PlatformsImage/Meta.png',
    checked: false
  },
  {
    name: 'Messenger',
    imgUrl: '/src/assets/PlatformsImage/Messenger.png',
    checked: false
  },
  {
    name: 'Line',
    imgUrl: '/src/assets/PlatformsImage/Line.png',
    checked: false
  }
])

import { usePlatformStore } from '@store'
const platformStore = usePlatformStore()

//onMiunted
onMounted(() => {
  platFrom.map((item) => {
    platformStore.platFromlists.forEach((item2) => {
      if (item.name == item2.name) {
        item.checked = item2.checked
      }
    })
    console.log(item.checked)
  })
})
//获取点击的平台
const change = (e) => {
  console.log(e.target.name, e.target.attributes.imgUrl)

  const arr = numberOfProcessing(e.target.name, e.target.checked, e.target.attributes.imgUrl)

  platformStore.setPlatformList(arr)
}

const numberOfProcessing = (name, boolean, imgUrl) => {
  const platfromList = platformStore.platFromlists
  console.log(imgUrl, 'imgUrl')
  if (boolean) {
    platfromList.push({
      name: name,
      imgUrl: imgUrl.nodeValue,
      checked: boolean,
      children: []
    })
    platFrom.forEach((item) => {
      if (item.name == name) {
        item.checked = true
      }
    })
  } else {
    const id = platfromList.findIndex((item) => item.name === name)
    if (id !== -1) {
      platfromList.splice(id, 1)
    }
  }

  return platfromList
}
</script>

<style scoped lang="scss">
.platFrom {
  padding: 10px;
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    li {
      display: flex;
      height: 15vh;
      width: 24vw;
      // margin: 2vh;
      cursor: pointer;
      border: 1px solid #f8f7f7;
      &:hover {
        cursor: pointer;
        border: 1px solid #a8a4a4;
        transform: scale(1.01);
        box-shadow: 0 0 10px rgba(223, 220, 220, 0.5);
      }
      .PF1 {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;

        input {
          margin-left: 2vw;
          cursor: pointer;
        }
        label {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 5vw;
            height: 5vw;
            margin: 0 2vw;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
          }
          span {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
