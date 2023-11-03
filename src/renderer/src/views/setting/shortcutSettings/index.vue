<template>
  <div class="shortcut">
    <div class="s-first">
      <span>快捷键</span>
      <div class="content">
        <span>显示/隐藏主窗口</span>
        <el-input placeholder="按下你的键盘" size="small"></el-input>
      </div>
      <div class="content">
        <span>窗口拆分快捷键</span>
        <el-input placeholder="按下你的键盘" size="small"></el-input>
      </div>
    </div>
    <div class="s-second">
      <span>软件设置</span>
      <div class="content">
        <span>软件版本</span>
        <el-button plain size="small">检查更新</el-button>
      </div>
      <div class="content">
        <span>消息未读角标</span>
        <el-select v-model="value" class="m-2" placeholder="显示" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="content">
        <span>会话文本显示</span
        ><el-select v-model="value" class="m-2" placeholder="用户名" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="content">
        <span>关闭程序</span>
        <el-select v-model="value" class="m-2" placeholder="最小化到托盘" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="content">
        <span>语言</span>
        <el-select v-model="value" class="m-2" placeholder="中文（简体）" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
</script>

<style scoped lang="scss">
.shortcut {
  margin: 20px;
  .s-first {
    & > span {
      font-size: 14px;
      color: rgb(8, 231, 231);
    }
    .content {
      margin-top: 20px;
      margin-left: 20px;
      span {
        display: inline-block;
        width: 120px;
        font-size: 14px;
      }
      .el-input {
        width: 200px;
        margin-left: 200px;
      }
    }
  }
  .s-second {
    margin-top: 20px;
    & > span {
      font-size: 14px;
      color: rgb(8, 231, 231);
    }
    .content {
      margin-top: 20px;
      margin-left: 20px;
      span {
        display: inline-block;
        width: 120px;
        font-size: 14px;
      }
      .el-button {
        width: 100px;
        margin-left: 200px;
      }
      .el-select {
        width: 200px;
        margin-left: 200px;
      }
    }
  }
}
</style>
