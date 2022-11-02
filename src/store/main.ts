export default defineStore('main', () => {
  const huangyuhao = ref<string>('huangyuhao')
  const huang = computed(() => 11)
  return { huangyuhao, huang }
})
