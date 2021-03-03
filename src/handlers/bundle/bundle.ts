import GetFilesPath from '../getFilesPath'
import asyncWrapper from '../../utils/async-wrapper'
import ValidationError from '../../errors/validation-error'
import Archive from '../archiver'
import path from 'path'
import {Request, Response} from 'express'

export const bundle = asyncWrapper(async (req: Request, res: Response) => {
    let levelList: Array<number>
    const depth = req.query.depth as string
    const level = req.query.level as string[]

    if (depth) {
        levelList = [Number(depth)]
    } else {
        if (!level || !Array.isArray(level)) {
            throw new ValidationError("level is missing or it's not an array")
        }
        levelList = level.map((num: string, index: number) => {
            if (!Number(num)) {
                throw new ValidationError(`invalid level at index ${index}`)
            }
            return Number(num)
        })

    }

    const filePath = path.resolve('./src/data')
    const getFilesPath = new GetFilesPath(levelList, filePath)
    const filesInfo = getFilesPath.files

    const archiveFile = new Archive(filesInfo)
    await archiveFile.archiveFiles()
    res.send()
})
