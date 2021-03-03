import fs from 'fs'
import path from 'path'
import fileInformation from './fileInformationInterface'

export default class GetFilesPath {
    files: Array<fileInformation> = []
    private readonly endDeep: number = 0
    private currentDeep = 0
    private readonly rootFileDirectory: string = ''
    private depthArray: Array<number>

    constructor(depthArray: Array<number>, directory: string) {
        this.depthArray = depthArray.sort()
        this.endDeep = depthArray[depthArray.length - 1]
        this.rootFileDirectory = directory
        this.readPaths(directory)
    }

    readPaths(directory: string) {
        fs.readdirSync(directory).forEach(File => {
            const absolute = path.join(directory, File)
            if (fs.statSync(absolute).isDirectory()) {
                this.currentDeep++
                if (this.currentDeep - 1 >= this.endDeep) return
                return this.readPaths(absolute)
            } else {
                let fileInfo = this.getFileInfo(absolute)
                if (this.depthArray.includes(fileInfo.depth)) {
                    return this.files.push({
                        path: absolute,
                        name: fileInfo.name
                    })
                }
            }
        })
    }

    getFileInfo(absolute: string) {
        let path = absolute.replace(this.rootFileDirectory + '/', '')
        let pathArray = path.split('/')
        let depth = pathArray.length - 1
        let name = `${pathArray[depth - 1]}_${pathArray[depth]}`
        return {
            depth,
            name
        }
    }
}
