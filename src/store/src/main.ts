export default defineStore(
  'main',
  () => {
    const aa = ref(11)
    return { aa }
  },
  {
    persist: true
  }
)
