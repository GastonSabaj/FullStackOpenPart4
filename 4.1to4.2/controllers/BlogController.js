/* 
    El enrutador es de hecho un middleware, que se puede utilizar para definir "rutas relacionadas" en un solo lugar, 
    que normalmente se coloca en su propio módulo.
*/
const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
})

module.exports = blogRouter