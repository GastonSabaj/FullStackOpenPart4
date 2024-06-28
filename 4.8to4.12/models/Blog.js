  const mongoose = require('mongoose');

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
      type: Number,
      default: 0
    }
  });
  
  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      //Esto se encarga de cambiar el nombre del campo _id al campo id en el objeto retornado.
      returnedObject.id = returnedObject._id.toString()
    }
  })


  const Blog = mongoose.model('Blog', blogSchema);

  module.exports = Blog;
