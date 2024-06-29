import { Request, Response, NextFunction } from 'express'
import goodlog from 'good-logs'
import { Role } from 'model'
import { CODE, RESPONSE } from 'constant'

/**
 * Controller class for managing roles
 */
class RoleController {
  private static _roleId: string

  static setRoleId(req: Request) {
    this._roleId = req.params.id
  }

  /**
   * Get all roles
   *
   */
  public static async getAllRole(_req: Request, res: Response, _next: NextFunction) {
    try {
      const roles = await Role.find()

      if (!roles) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      res.status(CODE.OK).send(RESPONSE.OK(roles))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Get a role by ID.
   * @param _req - The request object.
   * @param res - The response object.
   * @param _next - The next function.
   */
  public static async getRoleById(_req: Request, res: Response, _next: NextFunction) {
    try {
      const role = await Role.findById(this._roleId)

      if (!role) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      res.status(CODE.OK).send(RESPONSE.OK(role))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Create a new role.
   * @param _req - The request object.
   * @param res - The response object.
   * @param _next - The next function.
   */
  public static async createRole(_req: Request, res: Response, _next: NextFunction) {
    try {
      const role = await Role.create(_req.body)

      res.status(CODE.CREATED).send(RESPONSE.CREATED(role))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Update a role by ID.
   * @param _req - The request object.
   * @param res - The response object.
   * @param _next - The next function.
   */
  public static async updateRole(_req: Request, res: Response, _next: NextFunction) {
    try {
      const role = await Role.findByIdAndUpdate(this._roleId, _req.body, {
        new: true,
        runValidators: true
      })
      if (!role) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }
      res.status(CODE.OK).send(RESPONSE.OK(role))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Delete a role by ID.
   * @param _req - The request object.
   * @param res - The response object.
   * @param _next - The next function.
   */
  public static async deleteRole(_req: Request, res: Response, _next: NextFunction) {
    try {
      const role = await Role.findByIdAndDelete(this._roleId)

      if (!role) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      res.status(CODE.OK).send(RESPONSE.OK(role))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default RoleController
