import type { ToRef } from 'vue'

import appStore from '~/store/src/app'

type AutoToRefs<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
}

const storeExports = {
  app: appStore
}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as unknown as AutoToRefs<ReturnType<(typeof storeExports)[T]>>
}
