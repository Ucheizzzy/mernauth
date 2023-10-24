import multer from 'multer'
import DataURIParser from 'datauri/parser.js'
import path from 'path'

const storage = multer.memoryStorage()
const upload = multer({ storage })
const parser = new DataURIParser()
export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString()
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
