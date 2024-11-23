const multer = require("multer")
const storage  = multer.diskStorage({ 
    destination:(req,res,cb)=>{ 
        cb(null,'public/Images')
    },
    filename:(req,file,cb)=>{
       cb(null, Date.now()+'--'+ file.originalname);
    }
  })
const upload = multer({storage}).single('image')



module.exports = upload
