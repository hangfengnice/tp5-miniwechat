const koa = require('koa')
const Router = require("koa-router")
const app = new koa()
const router = new Router()

router.get('/classic/latest' , (ctx, next) => {
  ctx.body = { key : 'classic'}
})

app.use(router.routes())

app.listen(3000)
