declare module 'lenis' {
  interface LenisOptions {
    duration?: number
    easing?: (t: number) => number
    smoothWheel?: boolean
    smoothTouch?: boolean
    touchMultiplier?: number
    infinite?: boolean
    orientation?: 'vertical' | 'horizontal'
    gestureOrientation?: 'vertical' | 'horizontal' | 'both'
    wrapper?: HTMLElement | Window
    content?: HTMLElement
  }

  export default class Lenis {
    constructor(options?: LenisOptions)
    on(event: 'scroll', callback: (args: any) => void): void
    raf(time: number): void
    destroy(): void
    scrollTo(target: string | number | HTMLElement, options?: any): void
    stop(): void
    start(): void
  }
}

