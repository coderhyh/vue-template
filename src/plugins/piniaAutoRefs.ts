import { AutoToRefs, ToRef } from 'vue'

import { main } from '~/store'

declare module 'vue' {
  export type AutoToRefs<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
  }
}

const storeExports = { main }
export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as AutoToRefs<ReturnType<typeof storeExports[T]>>
}
