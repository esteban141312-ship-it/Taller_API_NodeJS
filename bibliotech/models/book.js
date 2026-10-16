import mongoose, { Schema } from 'mongoose';
const bookSchema = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true,
        minLength: 1,
        maxLength: 120,
    },

    isbn: {
        type: String, required: true, unique: true, trim: true,
        match: [/^\d{10,13}$/]
    },

    author: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required: true,
        validate: {
            validator: async function (id) {
                //  modelo 'Autor'
                const Autor = mongoose.model('author');

                // Buscar si existe un autor con ese ID y activo === true
                const autorExistente = await Autor.findOne({ _id: id, active: true });

                // Retorna true si existe y está activo, o false si no
                return !!autorExistente;
            },
            message: 'El autor especificado no existe o no se encuentra activo'
        }

    },

    genre: { type: String,
        enum: {
      values: ['novela', 'cuento', 'poesia', 'ensayo','tecnologia','historia','infantil'],
      message: '{VALUE} no es un estado válido'
    }
    
     },


    year:{type:Number, required:false,
        validate: [
            {validator: Number.isInteger,
                message: '{VALUE} no es un numero entero'
            },
        {
            validator: value=>value<=new Date().getFullYear(),
            message:"el año de nacimiento no puede ser mayor que el año actual"
        }
        ],
        
    },

    totalCopies:{type:Number,required:true,
        validate:{validator: Number.isInteger,
            message: '{VALUE} no es un numero entero'
        },
    
    },

availableCopies:{
    type:Number,
    min:0,
    validate:{
        validator:Number.isInteger,
        message: '{VALUE} no es un número entero'
    }

},

active:{
    type:Boolean,
    default:true
}



}, {
    timestamps: true,
    versionKey: false
});
export default mongoose.model('book', bookSchema);


