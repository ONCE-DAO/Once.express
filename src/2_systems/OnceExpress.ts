import { Once, OnceState } from './../../../once.ts@main/src/3_services/Once.interface'

export class OnceExpress implements Once {
  static start () {
    throw new Error('Method not implemented.')
  }

  discover (): OnceState {
    throw new Error('Method not implemented.')
  }
}
