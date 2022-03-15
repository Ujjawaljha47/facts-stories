import mongoose from 'mongoose'
import grid from 'gridfs-stream'

const URL = ""

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});



export const uplaodImage = (req, res) => {
    try {
        if(!req.file) return res.status(400).json('File not found')
        const imageUrl = `${URL}/file/${req.file.filename}`
        res.status(200).json(imageUrl)
    } catch(error) {
        res.status(500).json(error)
    }
}

export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json(error);
    }
}