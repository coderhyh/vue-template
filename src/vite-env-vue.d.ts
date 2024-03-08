import 'vue'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    // $Bus: string
  }
}
