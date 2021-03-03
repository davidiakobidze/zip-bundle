import {NextFunction, Request, RequestHandler, Response} from 'express'

export default function asyncWrapper(fn: RequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        return fn(req, res, next).catch(next)
    }
}
