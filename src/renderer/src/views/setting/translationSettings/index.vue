<template>
  <div class="translaton">
    <div class="t-top">
      <div class="general">通用设置</div>
      <div class="route">
        <span> 路线切换</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">稳定模式</el-radio>
          <el-radio :label="2">增强模式</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="platFromSet">
      <div class="title">Whatsapp的翻译设置</div>
      <div class="t-content">
        <span>源语言</span>
        <el-select v-model="value" class="m-2" placeholder="检测语言" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="t-content">
        <span>目标语言</span>
        <el-select v-model="value" class="m-2" placeholder="英文" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="t-content">
        <span>接受语言</span>
        <el-select v-model="value" class="m-2" placeholder="中文(简体)" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref(1)

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
.translaton {
  margin: 20px;
  .t-top {
    .general {
      font-size: 14px;
      color: rgb(8, 231, 231);
    }
    .route {
      font-size: 14px;
      margin: 20px 0 0 30px;
      span {
        margin-right: 200px;
      }
    }
  }
  .platFromSet {
    margin-top: 20px;
    .title {
      font-size: 14px;
      color: rgb(8, 231, 231);
    }
    .t-content {
      display: flex;
      margin-top: 20px;
      align-items: center;
      padding-left: 30px;
      span {
        display: inline-block;
        width: 80px;
        height: 10px;
        font-size: 14px;
        margin-right: 200px;
      }
    }
  }
}
</style>
