//Este archivo solo setea el schema de note para mongoose

const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //Esto se encarga de cambiar el nombre del campo _id al campo id en el objeto retornado.
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    //__v es un campo interno de Mongoose que se utiliza para rastrear la versión del documento. No es necesario incluirlo en los objetos JSON, por lo que se elimina
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)