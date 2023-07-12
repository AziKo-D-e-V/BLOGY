const {Router} = require('express');
const { blogs, contactus, ShowContactUs, Comments, Comment } = require('../controllers/blog.controller');
const { deleteBlog } = require('../controllers/delete.controller');

const router = new Router()

router.post('/createblog', blogs)
router.post('/contactus', contactus)
router.get('/showcontactus', ShowContactUs)
router.post('/comment', Comments)
router.delete('/blogdelete/:id', deleteBlog)
router.get('/showcomment', Comment)

module.exports = router;