const AlumisenaManagementContext = require('../../shared/alumisena-management-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 200 },
    birthFundationDate: { type: Date, required: true},
    type: { type: String, default: 'PRIVATE_INDIVIDUAL', enum: ["LEGAL_ENTITY", "PRIVATE_INDIVIDUAL"] },
    rg: { type: String },
    cpfCnpj: { type: String, required: true, maxlength: 14 },
    email: { type: String, maxlength: 200, unique: true },
    telephone: { type: String, required: true, maxlength: 11 },
    street: { type: String, required: true, maxlength: 200 },
    houseNumber: { type: Number, maxlength: 200 },
    city: { type: String, required: true, maxlength: 200 },
    neighborhood: { type: String, required: true, maxlength: 200 },
    cep: { type: String, required: true, maxlength: 8 },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }    
    },
    {
        versionKey: false,
        timestamps: true
    });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.ClientSchema = schema;
module.exports.Client = AlumisenaManagementContext.conn.model('Client', schema);
