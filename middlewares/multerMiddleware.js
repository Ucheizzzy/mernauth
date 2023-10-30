import multer from 'multer'
import DataParser from 'datauri/parser.js'
import path from 'path'
import { BadRequestError } from '../errors/customeErrors.js'

const storage = multer.memoryStorage()

const upload = multer({ storage })

const parser = new DataParser()

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString()
  console.log(fileExtension)
  if (
    fileExtension !== '.png' &&
    fileExtension !== '.jpg' &&
    fileExtension !== '.jpeg'
  ) {
    throw new BadRequestError('Please enter an image and nothing elses')
  }
  return parser.format(fileExtension, file.buffer).content
}

export default upload
