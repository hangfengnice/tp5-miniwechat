const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const {PositiveIntergerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')

router.get('/latest',new Auth().m , async (ctx, next) => {
  ctx.body = ctx.auth.uid
  const flow = Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
})

module.exports = router
 