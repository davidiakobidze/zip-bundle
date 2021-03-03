import Archiver from 'archiver'
import fs from 'fs'
import fileInformation from './fileInformationInterface'

export default class Archive {

  private options: Archiver.ArchiverOptions = { statConcurrency: 30 }
  private stream = fs.createWriteStream('./file.zip')
  private archiver = Archiver.create('zip')
  private filePaths: Array<fileInformation>

  constructor (filePaths: Array<fileInformation>) {
    this.filePaths = filePaths
    Archiver('zip', this.options)

    this.stream.on('close', function () {
      console.log('Archiver has been finalized and the output file descriptor has closed.')
    })

    this.stream.on('end', function () {
      console.log('Data has been drained')
    })

    this.stream.on('error', function (err) {
      throw err
    })

    this.archiver.pipe(this.stream)
  }

  async archiveFiles () {
    // if we pass too many files, we might get an EMFILE, too many open files error.
    this.filePaths.forEach(file => {
      this.archiver.append(fs.createReadStream(file.path), { name: file.name })
    })

    await this.archiver.finalize()
  }
}
