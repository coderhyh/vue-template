import { debounce } from './debounce'

export function throttle(fn: (...args: any[]) => any, options?: { delay?: number, immediate?: boolean }) {
  const { delay = 1000, immediate = false } = options ?? {}
  let timer: number | undefined
  let isInvoke = false
  const resetInvoke = debounce(() => (isInvoke = false), { delay })

  function _throttle(...rest: any[]) {
    return new Promise((resolve, reject) => {
      resetInvoke()
      if (immediate && !isInvoke) {
        execFunctionWithCatchError()
        isInvoke = true
      }
      else {
        if (timer)
          return
        timer = setTimeout(() => {
          execFunctionWithCatchError()
          timer = undefined
        }, delay)
      }
      function execFunctionWithCatchError(this: any) {
        try {
          resolve(fn.apply(this, rest))
        }
        catch (error) {
          reject(error)
        }
      }
    })
  }

  _throttle.cancel = () => (clearTimeout(timer), (timer = undefined))
  return _throttle
}
