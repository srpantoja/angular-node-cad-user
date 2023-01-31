import { Request, Response } from 'express'
import CreateUserDto from '../dto/create.user.dto'
import UserService from '../services/user.service'
class UserController {
    public async findAll(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userListService = new UserService()

        const users = await userListService.findAll()

        return response.json(users)
    }

    public async create(req: Request, response: Response): Promise<Response> {
        const userBody: CreateUserDto = req.body
        const userCreateService = new UserService()

        const user = await userCreateService.create(userBody)

        return response.status(201).json(user)
    }
}

export default UserController
