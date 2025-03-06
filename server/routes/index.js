const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const tagRouter = require('./tagRouter')
const categoryRouter = require('./categoryRouter')
const imageRouter = require('./imageRouter')
const reviewRouter = require('./reviewRouter')
const favoriteRouter = require('./favoriteRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/tag', tagRouter)
router.use('/category', categoryRouter)
router.use('/image', imageRouter)
router.use('/review', reviewRouter)
router.use('/fav', favoriteRouter)

module.exports = router