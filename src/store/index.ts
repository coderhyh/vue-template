import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
// https://seb-l.github.io/pinia-plugin-persist/
store.use(piniaPluginPersist)

export default store
