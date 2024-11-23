
const express = require('express')
const router = express()
const UserController = require('../controllers/UserController')
const upload = require('../middlewares/multer')



router.post("/register",upload,UserController.register)
router.post("/login",UserController.login)
router.get("/users",UserController.getAllUsers)



module.exports = router