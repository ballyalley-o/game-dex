import { Request, Response, NextFunction } from 'express'
import { spawn } from 'child_process'
import goodlog from 'good-logs'
import axios from 'axios'

class SDKController {
  private static _userId: string

  static setUserId(req: UserRequest) {
    this._userId = req.user.id
  }

  public static async getAllTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await axios.get('http://127.0.0.1:5001/teams')

      res.status(200).send({
        success: true,
        message: 'Teams fetched successfully',
        data: teams.data
      })
    } catch (error: any) {
      console.error(error)
      res.status(500).send({
        success: false,
        message: 'Failed to fetch teams',
        error: error.message
      })
    }
  }

  public static async getTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const teamId = req.params.id
      const teams = await axios.get(`http://127.0.0.1:5001/teams/info/${teamId}`)

      res.status(200).send({
        success: true,
        message: 'Team fetched successfully',
        data: teams.data
      })
    } catch (error: any) {
      console.error(error)
      res.status(500).send({
        success: false,
        message: 'Failed to fetch team',
        error: error.message
      })
    }
  }

  public static async getAllPlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const players = await axios.get('http://127.0.0.1:5001/players')

      res.status(200).send({
        success: true,
        message: 'All Players fetched',
        data: players.data
      })
    } catch (error: any) {
      console.error(error)
      res.status(500).send({
        success: false,
        message: 'Failed to fetch all players',
        error: error.message
      })
    }
  }

  public static async getDraftHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const draftHistory = await axios.get('http://127.0.0.1:5001/draft/history')

      res.status(200).send({
        success: true,
        message: 'Draft History fetched',
        data: draftHistory.data
      })
    } catch (error: any) {
      console.error(error)
      res.status(500).send({
        success: false,
        message: 'Failed to fetch draft history',
        error: error.message
      })
    }
  }
}

export default SDKController
