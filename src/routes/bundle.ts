import express from 'express'
import { bundle } from '../handlers/bundle/bundle'

export const router = express.Router()

const URL: string = '/bundle'
router.get(URL, bundle)
