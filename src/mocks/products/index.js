import { rest } from 'msw'
import { db } from '../db'

export default [
  rest.get('/products', (req, res, ctx) => {
    return res(
      ctx.json(
        db
          .select()
          .from('products')
          .toArray()
          .build()
      )
    )
  }),
  rest.get('/products/:productId', (req, res, ctx) => {
    const { productId } = req.params
    return res(
      ctx.json(
        db
          .select(productId)
          .from('products')
          .build()
      )
    )
  }),
  rest.post('/products', (req, res, ctx) => {
    const data = JSON.parse(req.body)
    const errors = []
    !data.name && errors.push({ field: 'name', message: 'Отсутствует поле "name"' })
    !data.price && errors.push({ field: 'price', message: 'Отсутствует поле "price"' })

    const responseData = errors.length > 0 ? errors : db
      .select()
      .from('products')
      .add(data)
      .build()

    return res(
      ctx.status(errors.length > 0 ? 422 : 200),
      ctx.json(responseData)
    )
  })
]
