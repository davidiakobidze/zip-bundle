import express from 'express'
import { router as bundleRouter } from './routes/bundle'
import { ErrorHandlingMiddleware } from './middleware/error-handling'

const app = express()
const port = 3000

app.use('/', bundleRouter)

ErrorHandlingMiddleware(app)

app.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})
