<template>
  <div class="networkChecks">
    <div class="n-first">
      <div class="title">代理服务器（全局）</div>
      <el-checkbox label="启用代理服务器" />
      <div class="broker">
        <span>代理类型</span>
        <el-select placeholder="HTTP" size="small"></el-select>
      </div>
      <div class="server">
        <span>服务器</span>
        <el-input placeholder="请输入主机地址" size="small"></el-input> :
        <el-input placeholder="请输入端口号" size="small"></el-input>
      </div>
      <el-checkbox label="启用代理服务器验证" />
      <div class="username">
        <span>用户名</span>
        <el-input size="small"></el-input>
      </div>
      <div class="password">
        <span>密码</span>
        <el-input size="small"></el-input>
      </div>
      <div class="submit">
        <el-button type="">检查代理服务器</el-button>
        <el-button type="primary">应用</el-button>
      </div>
    </div>
    <el-divider />
    <div class="n-second">
      <div>代理服务器（会话）</div>
      <el-checkbox label="启用会话代理功能" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.networkChecks {
  margin: 20px;
  .n-first {
    .title {
      font-size: 14px;
      color: rgb(8, 231, 231);
    }
    .el-checkbox {
      margin-top: 20px;
    }
    .broker {
      margin-top: 20px;
      span {
        display: inline-block;
        width: 100px;
        font-size: 14px;
        margin-right: 200px;
        margin-left: 20px;
      }
    }
    .server {
      margin-top: 20px;
      span {
        display: inline-block;
        width: 100px;
        font-size: 14px;
        margin-right: 200px;
        margin-left: 20px;
      }
      .el-input {
        width: 200px;
      }
    }
    .username,
    .password {
      margin-top: 20px;
      span {
        display: inline-block;
        width: 100px;
        font-size: 14px;
        margin-right: 200px;
        margin-left: 20px;
      }
      .el-input {
        width: 200px;
      }
    }
    .submit {
      margin-top: 20px;
      padding-left: 20px;
    }
  }
  .n-second {
    margin-top: 20px;
    div {
      font-size: 14px;
      color: rgb(8, 231, 231);
    }
    .el-checkbox {
      margin: 20px 0 0 20px;
    }
  }
}
</style>
