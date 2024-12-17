export function debounce(fn: (...args: any[]) => any, options?: { delay?: number, immediate?: boolean }) {
  const { delay = 1000, immediate = false } = options ?? {}
  let timer: number | undefined
  let isInvoke = false

  const _debounce = function (...rest: any[]) {
    return new Promise((resolve, reject) => {
      if (timer)
        clearTimeout(timer)

      if (immediate && !isInvoke) {
        execFunctionWithCatchError()
        isInvoke = true
      }
      else {
        timer = setTimeout(() => {
          execFunctionWithCatchError()
          isInvoke = false
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

  _debounce.cancel = function () {
    if (timer)
      clearTimeout(timer)
    isInvoke = false
  }

  return _debounce
}
