import { Handler, NextFunction, Request, Response, Router } from 'express'
import UserController from '../controller/user.controller'
import { ValidateDTO } from '../../../shared/http/midleware/validate.dto'
import userValidate from '../validate/user.validate'
const resolver = (handlerFn: Handler) => {
    return (request: Request, response: Response, next: NextFunction) => {
        return Promise.resolve(handlerFn(request, response, next)).catch(
            (error: Error) => next(error),
        )
    }
}

const usersRouter = Router()
const userController = new UserController()

usersRouter.get('/', resolver(userController.findAll))
usersRouter.post(
    '/',
    userValidate,
    ValidateDTO,
    resolver(userController.create),
)

export default usersRouter
