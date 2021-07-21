import { rest } from 'msw'
import { db } from '../db'

export default [
  rest.get('/products', (req, res, ctx) => {
    return res(
      ctx.json(
        db
          .select()
          .from('products')
          // .toArray()
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
    const data = req.body
    const errors = []
    !data.name && errors.push({ field: 'name', message: 'Название не может быть пустым значением' })
    !data.price && errors.push({ field: 'price', message: 'Цена не может быть пустым значением' })

    const responseData = errors.length > 0 ? errors : db
      .select()
      .from('products')
      .add(data)
      .build()

    return res(
      ctx.status(errors.length > 0 ? 422 : 200),
      ctx.json(responseData)
    )
  }),
  rest.put('/products/:productId', (req, res, ctx) => {
    const { productId } = req.params
    const data = req.body
    const errors = []
    !data.name && errors.push({ field: 'name', message: 'Название не может быть пустым значением' })
    !data.price && errors.push({ field: 'price', message: 'Цена не может быть пустым значением' })

    const responseData = errors.length > 0 ? errors : db
      .select(productId)
      .from('products')
      .update(data)
      .build()

    return res(
      ctx.status(errors.length > 0 ? 422 : 200),
      ctx.json(responseData)
    )
  })
]
