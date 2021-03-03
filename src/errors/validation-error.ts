import CustomError from './custom-error'

export default class ValidationError extends CustomError {
    statusCode = 400

    constructor(public message: string) {
        super(message)
        Object.setPrototypeOf(this, ValidationError.prototype)

    }
}
