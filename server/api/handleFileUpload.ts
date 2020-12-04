import { Response, Request } from 'express'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

interface CustomRequest extends Request {
    file: any;
    rawBody: any;
}

const isFileSavedToLocal = async (path, newPath, res) =>
    await fs.rename(path, newPath, (err) => {
        if (err) res.send({
            status: 400,
            message: 'Error while saving file to local',
            error: err
        })
        res.send({
            status: 200,
            message: 'File successfully saved to local',
        })
    })



const saveFileToLocal = async (error, fields, files, res) => {
    if (error) {
        res.send({
            status: 400,
            message: 'Error saving file to local',
            error: error
        })
    }
    const { file: { path: oldPath, name } } = files
    const newPath = `${path.resolve("./")}/temp/${name}`
    await isFileSavedToLocal(oldPath, newPath, res)
}
const handleFileUpload = async (incomingRequest: CustomRequest, res: Response) => {

    const form = new formidable.IncomingForm();
    await form.parse(incomingRequest, (error, fields, files) => saveFileToLocal(error, fields, files, res))
}

export default handleFileUpload