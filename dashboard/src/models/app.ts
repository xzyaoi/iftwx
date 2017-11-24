import { POJ } from '../apis/parse'

class App extends POJ {
  readonly className: string
  constructor(className?: string, options?: any) {
    super('App', options)
    this.className = 'App'
  }
}

export {
  App
}
