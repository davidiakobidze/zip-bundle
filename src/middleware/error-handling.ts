import CustomError from '../errors/custom-error'
import { Express,Request,Response, NextFunction } from 'express'

function customErrorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: { message: err.message } })
  }
  next(err)
}

function genericErrorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send({ error: { message: (err.message || 'Something went wrong') } })
  next()
}

export function ErrorHandlingMiddleware (app: Express) {
  app.use([
    customErrorHandler,
    genericErrorHandler
  ])
}
