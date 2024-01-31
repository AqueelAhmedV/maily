import { flushSync } from "react-dom"

// TODO: make useState polyfill?, (alter prototype?)
export function tryViewTransition(func, ...args) {
    if (document.startViewTransition) {
        document.startViewTransition(() => flushSync(() => {
            func(...args)
        }))
    } else func(...args)
}