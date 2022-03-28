import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const AlumnoSchema = new Schema({
    nombre: { type: String, required: true },
    apellido1: { type: String, requied: true },
    apellido2: { type: String, requied: true },
    dni: { type: String, required: true },
    n_expediente: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: Number, required: true },
    nombre_usuario: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    delegado: { type: Schema.Types.ObjectId, ref: 'Alumno' }
});

AlumnoSchema.pre('save', async function(next) {
    let user = this;

    if(!user.isModified('password')) next();

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
})

AlumnoSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export default model('Alumno', AlumnoSchema);