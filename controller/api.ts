import { Request, Response, NextFunction } from 'express'
import { spawn } from 'child_process'
import goodlog from 'good-logs'
import axios from 'axios'

class ApiController {
  private static _userId: string

  static setUserId(req: UserRequest) {
    this._userId = req.user.id
  }

  public static async getApi(req: Request, res: Response, next: NextFunction) {
    const python = spawn('python3', ['nba-live.py'])
    let dataToSend: any

    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...')
      dataToSend = data.toString()
    })

    python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`)
      res.status(200).json(dataToSend)
    })
  }
}

export default ApiController
