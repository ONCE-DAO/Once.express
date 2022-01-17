import { IOR } from '../../../once.ts@main/src/3_services/IOR.interface'
import { Server } from '../../../once.ts@main/src/3_services/Server.interface'
import { Once } from './../../../once.ts@main/src/3_services/Once.interface'

import express from 'express'
import http from 'http'
import cors from 'cors'
import serveIndex from 'serve-index'
import path from 'path'

export class OnceExpress implements Once {
  protected express = express()

  id: string | undefined
  name: string | undefined
  server: Server[] = []
  static async start (port = 8080) {
    const instance = new OnceExpress()
    console.log('running in node')
    instance.express.use(cors())

    instance.express.get('/', (req, res) => {
      res.sendFile(path.resolve('dist/Once.html'))
    })
    instance.express.use('/', serveIndex('dist', { icons: true }))
    instance.express.use('/', express.static('dist', {}))
    // instance.express.use('/docs', express.static('docs', {}))

    await instance.startServer(port)
    return instance
  }

  async discover (): Promise<IOR[]> {
    throw new Error('Method not implemented.')
  }

  protected logUrls (url:string) {
    console.log(`localhost:   ${url}`)
    console.log(`repository:  ${url}/EAMD.ucp`)
    // console.log(`docs:        ${url}/docs`)
  }

  protected async startServer (port:number) {
    const server = http.createServer(this.express)
    server.listen(port, () => this.logUrls(`http://localhost:${port}`))
  }
}
