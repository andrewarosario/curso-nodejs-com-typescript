import { Schema, model, Document, Model, DocumentQuery } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UsuarioInterface } from '../interfaces/usuario.interface';

interface UsuarioModel extends UsuarioInterface, Document {
    compareHash(data: string): Promise<boolean>;
    generateToken(): string;
}

interface UsuarioStatic extends Model<UsuarioModel> {
    buscaTodosChat(idUsuario: string): DocumentQuery<UsuarioModel[], UsuarioModel>;
}

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
});

UsuarioSchema.pre<UsuarioModel>('save', async function hashPassword(next) {
    if (!this.isModified('senha')) next();

    this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.pre<UsuarioModel>('save', function createAvatar() {
    const randomId = Math.floor(Math.random() * (1000000)) + 1;

    this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`;
});

UsuarioSchema.methods.compareHash = function(hash: string): Promise<boolean> {
    return bcrypt.compare(hash, this.senha);
}

UsuarioSchema.methods.generateToken = function(): string {

    const tokenDecoded = { _id: String(this._id), nome: this.nome, avatar: this.avatar };

    return jwt.sign(tokenDecoded, config.SALT_KEY, {
        expiresIn: '1d'
    });
}

UsuarioSchema.statics.buscaTodosChat = function(idUsuario: string): DocumentQuery<UsuarioModel[], UsuarioModel> {
    return this.find({ _id: { $ne: idUsuario } });
}

export default model<UsuarioModel, UsuarioStatic>('Usuario', UsuarioSchema);