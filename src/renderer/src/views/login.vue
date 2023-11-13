<template>
  <div class="main">
    <headerCompontent class="header"></headerCompontent>
    <div class="m-left">
      <div class="body">
        <img class="b-top" src="@assets/image/left.jpg" alt="" />
        <div class="b-centre">
          <div class="font">邀请码</div>
          <el-input
            v-model="invitationCode"
            style="width: 40vw"
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
          <el-button type="primary" size="large" round @click="btnLogin">登录</el-button>
        </div>
      </div>
    </div>
    <div class="m-right">
      <img src="@assets/image/right.jpg" alt="" class="img" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Key } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import headerCompontent from '@components/header.vue'
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
      localStorage.setItem('token', invitationCode.value)
    }
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: relative;
  .header {
    position: absolute;
    top: 0;
    right: 0;
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
          color: red;
          font-size: 14px;
        }
        .check {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          .c-left {
            a {
              font-size: 12px;
              text-decoration: none;
            }
          }
        }
      }
      .el-button {
        margin-top: 10px;
        width: 100%;
        height: 15%;
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
