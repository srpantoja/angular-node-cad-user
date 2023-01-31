import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator/src/validation-result'
import AppError from '../../errors/app.error'

export function ValidateDTO(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) throw new AppError(errors.array())

    next()
}
