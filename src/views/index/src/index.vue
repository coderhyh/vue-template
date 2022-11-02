<template>
  <div class="index">
    <img src="https://coderhyh.top/logo.png" width="50" height="50" alt="" @click="click" />
  </div>
</template>

<script setup lang="ts">
import request from '~/service'

interface R {
  list: {
    id: number
    name: string
  }[]
}
PointerEvent
const click = async (event: MouseEvent) => {
  console.log(event.clientX, 111)
}
</script>

<style lang="less" scoped>
.index {
  width: 500px;
  height: 500px;
  user-select: none;
}
</style>
