const {Schema,model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'Nombre Categoria es obligatorio.'],
        unique:true
    },

    estado:{
        type:Boolean,
        default:true,
        required:true
    },

    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuarios',
        required:true
    }
});

CategoriaSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model('Categorias',CategoriaSchema);