/* 
    El enrutador es de hecho un middleware, que se puede utilizar para definir "rutas relacionadas" en un solo lugar, 
    que normalmente se coloca en su propio módulo.
*/
const blogRouter = require('express').Router()
const Blog = require('../models/Blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response, next) => {
  try{
    //Necesito chequear que el body tenga el title y url
    const body = request.body
    if(!body.title || !body.url){
      return response.status(400).json({
        error: 'title and url are required'
      })
    }

    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }catch(exception){
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response,next) => {
  try{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }catch(exception){
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  try {
    //Agarro el body de la request
    const body = request.body;

    //Creo un objeto blog con los datos para actualizar
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    };

    //Busco por ID y actualizo el Blog, devolviendo el Blog actualizado
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.status(200).json(updatedBlog).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter