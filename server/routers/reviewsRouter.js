const express = require("express");
const userAuth = require("../authMiddleWare/userAuth");
const AdminAuth = require("../authMiddleWare/adminAuth");
const managerAuth = require("../authMiddleWare/managerAuth");
const{createRivew,getReviews,updateReviewStatus,getReviewById} =require("../controller/reviewController")

const router = express.Router();

router.post('/createreview',userAuth,createRivew)
router.get('/getRivews',managerAuth,getReviews)
router.put('/updatereview',managerAuth,updateReviewStatus)
router.get('/getrevByid/:id',managerAuth,getReviewById)


module.exports = router;