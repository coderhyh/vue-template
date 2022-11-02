<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const { huang, huangyuhao } = useStore('main')
</script>

<style lang="less" scoped></style>
