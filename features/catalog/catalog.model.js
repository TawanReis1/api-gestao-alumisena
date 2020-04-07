const AlumisenaManagementContext = require('../../shared/alumisena-management-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true, maxlength: 200 },
    price: { type: Number, required: true},
    quantity: { type: Number, required: true },
    typeQuantity: { type: String, default: 'KG', enum: ["KG", "UN"] },
    color: { type: String, required: true, maxlength: 80 },
    available: { type: Boolean, required: true },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        versionKey: false,
        timestamps: true
    });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.CatalogSchema = schema;
module.exports.Catalog = AlumisenaManagementContext.conn.model('Catalog', schema);
