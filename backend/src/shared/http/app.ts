import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from './routes'
import AppError from '../errors/app.error'

const app = express()

app.use(cors({
    origin: "*",
    methods: "POST,GET"
}))
app.use(express.json())

app.use(routes)

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError)
            return response
                .status(error.statusCode)
                .json({ status: 'error', message: error.message })
        else
            return response
                .status(500)
                .json({ status: 'error', message: 'Internal server error' })
    },
)
export { app }
