<template>
  <div class="networdCheck">
    <div class="n-title">
      <span>检查网络连接平台延迟</span>
      <el-button type="" :icon="Compass" :loading-icon="Eleme" :loading="isLoad" @click="btn"
        >开始测速</el-button
      >
    </div>

    <div class="n-main">
      <ul>
        <li>
          <el-card>
            <el-tag type="success" effect="dark">流畅</el-tag>
            <div class="font">Zalo</div>
            <div class="delay">{{ rtt }} ms</div>
          </el-card>
        </li>
        <li>
          <el-card>
            <el-tag type="success" effect="dark">流畅</el-tag>
            <div class="font">Whatsapp</div>
            <div class="delay">333ms</div>
          </el-card>
        </li>
        <li>
          <el-card>
            <el-tag type="success" effect="dark">流畅</el-tag>
            <div class="font">line</div>
            <div class="delay">333ms</div>
          </el-card>
        </li>
        <li>
          <el-card>
            <el-tag type="success" effect="dark">流畅</el-tag>
            <div class="font">messnger</div>
            <div class="delay">333ms</div>
          </el-card>
        </li>
        <li>
          <el-card>
            <el-tag type="success" effect="dark">流畅</el-tag>
            <div class="font">skype</div>
            <div class="delay">333ms</div>
          </el-card>
        </li>
        <li>
          <el-card>
            <el-tag type="success" effect="dark">流畅</el-tag>
            <div class="font">telegram</div>
            <div class="delay">333ms</div>
          </el-card>
        </li>
        <li>
          <el-card>
            <el-tag type="success" effect="dark">流畅</el-tag>
            <div class="font">meta business</div>
            <div class="delay">333ms</div>
          </el-card>
        </li>
        <li>
          <el-card>
            <el-tag type="success" effect="dark">流畅</el-tag>
            <div class="font">google</div>
            <div class="delay">333ms</div>
          </el-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Compass, Eleme } from '@element-plus/icons-vue'

const isLoad = ref(false)
const rtt = ref(0)
//开始检测
const btn = () => {
  //节流函数
  console.log(navigator.connection.rtt, 'dfdfdf')
  rtt.value = navigator.connection.rtt
  isLoad.value = true
  let timer = null

  if (!timer) {
    timer = setTimeout(() => {
      isLoad.value = false
      timer = null
      console.log('2222')
    }, 2000)
  }
}
// const btn = () => {
//   window.electron.ipcRenderer.invoke('open-file-dialog', {
//     name: 'open-window',
//     event: 'event',
//     data: 'null'
//   })
// }
</script>

<style scoped lang="scss">
.networdCheck {
  padding: 20px;
  .n-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 14px;
      color: rgb(8, 231, 231);
    }
    .el-button {
    }
  }
  .n-main {
    margin-top: 50px;
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: space-around;
      li {
        width: 170px;
        height: 15vh;
        margin: 0 20px 20px 0;

        .el-card {
          .font {
            margin-top: 10px;
            font-size: 14px;
            color: rgb(23, 143, 143);
          }
          .delay {
            margin-top: 10px;

            font-size: 10px;
            color: rgb(23, 143, 143);
          }
        }
      }
    }
  }
}
</style>
