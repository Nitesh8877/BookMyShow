const multer=require('multer')

//image storage
const imgConfig=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
})

//image filter
const isImage=(req,file,callback)=>{
    if(file.mimeType.startWith("image")){
        callback(null,true)
    }else{
        callback(new Error("Only images is allowed"))
    }
}

const upload=multer({
    storage:imgConfig,
    fileFilter:isImage
})

module.exports={upload}