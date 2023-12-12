<template>
  <div class="main">
    <div class="kkk" @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseleave">
      <headerCompontent class="header"></headerCompontent>
    </div>

    <div class="m-left">
      <div class="body">
        <img class="b-top" src="@assets/image/left.jpg" alt="" />
        <div class="b-centre">
          <div class="font">邀请码</div>
          <el-input
            v-model="invitationCode"
            input-style="width: 35vw;text-align: center;"
            placeholder="请输入邀请码"
            :prefix-icon="Key"
          />
          <div class="check">
            <div class="c-left">
              <el-checkbox
                v-model="checked1"
                label="我已阅读并同意"
                size="small"
                style="font-size: 12px"
              />
              <a href="">《用户服务协议》</a>
            </div>
            <el-checkbox v-model="checked2" class="c-right" label="保持登录" size="small" />
          </div>
          <el-button size="large" @click="btnLogin">登录</el-button>
        </div>
        <div class="b-bottom">
          <div>@ 2023 Haixiang All rights reserved</div>
          <div>Terms of Service - Privacy Policy</div>
        </div>
      </div>
    </div>
    <div class="m-right">
      <img src="@assets/image/right.jpg" alt="" class="img" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Key } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import headerCompontent from '@components/header.vue'

// import { captchaImage } from '@api/login'

//使用router
const router = useRouter()

const checked1 = ref(false)
const checked2 = ref(true)

//邀请码
const invitationCode = ref('EGHJKMMHKLK')

const btnLogin = () => {
  if (!checked1.value) {
    ElMessage.error('请确认阅读并同意《用户服务协议》')
  } else {
    if (checked2.value) {
      sessionStorage.setItem('token', invitationCode.value)
    }
    router.push('/')
  }
}

//窗口移动
const isDown = ref(false) // 鼠标状态
const baseX = ref(0),
  baseY = ref(0) //监听坐标

const mouseDown = (e) => {
  isDown.value = true
  baseX.value = e.clientX
  baseY.value = e.clientY
  // console.log(baseX, baseY, 'aaaaaa')
  document.onmousemove = function (e) {
    if (isDown.value) {
      const x = e.clientX - baseX.value
      const y = e.clientY - baseY.value

      window.electron.ipcRenderer.invoke('move-application', {
        posX: x,
        posY: y
      })
      // console.log(x, y, 'dddddd')
    }
  }
}

const mouseUp = () => {
  isDown.value = false
}

const mouseleave = () => {
  isDown.value = false
}
</script>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: relative;
  .kkk {
    position: absolute;
    height: 6vh;
    width: 100%;

    .header {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .m-left {
    width: 50vw;
    height: 100%;
    .body {
      margin: 60px;
      width: 100%;
      height: 100%;
      .b-top {
        width: 100%;
        height: 40%;
      }
      .b-centre {
        width: 80%;
        height: 40%;

        .font {
          margin-bottom: 5px;
          color: #197a8b;
          font-size: 12px;
        }
        .check {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          .c-left {
            a {
              font-size: 12px;
              text-decoration: none;
            }
          }
        }
        .el-input {
          height: 6vh;
        }
      }

      .b-bottom {
        margin-top: 40px;
        display: flex;
        font-size: 10px;
        color: #8f8f8f;
        div {
          &:nth-child(2) {
            margin-left: 100px;
          }
        }
      }
      .el-button {
        margin-top: 10px;
        width: 100%;
        height: 6vh;
        color: white;
        background-color: #197a8b;
        border-radius: 10px;
      }
    }
  }
  .m-right {
    width: 50vw;
    height: 100%;
    .img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
