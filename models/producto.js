const {Schema,model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'Nombre Producto es obligatorio.'],
        unique:true
    },
    descripcion:{
        type:String
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categorias',
        required:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    disponible:{
        type:Boolean,
        default:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuarios',
        required:true
    }
});

ProductoSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model('Productos',ProductoSchema);