const express = require('express')
const router = express()
const postController = require('../controllers/PostController')
const upload = require('../middlewares/multer')


router.use(express.static(__dirname + "/public"));
router.use("/uploads",express.static("uploads"))





router.post('/',upload,postController.createNewPost)
router.get('/',postController.getAllPosts)
router.put('/:id',upload,postController.updatePost)
router.delete('/:id',postController.deletePost)

module.exports = router