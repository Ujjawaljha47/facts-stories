import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'

const storage = new GridFsStorage({
    url: "mongodb+srv://mishor:patra@cluster0.ny7mg.mongodb.net/BLOGAPP?retryWrites=true&w=majority",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        //const match = ['image/png', 'image/jpg']
        //if(match.indexOf(file.mimetype) == -1)
            return `${Date.now()}-blog-${file.originalname}`
        /*return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }*/
    }
})

export default multer({ storage })