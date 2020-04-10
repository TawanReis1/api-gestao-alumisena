const { CatalogSchema } = require('../catalog/catalog.model')
const AlumisenaManagementContext = require('../../shared/alumisena-management-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 200 },
    client: {type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'Client', required: true },
    aditionalEmail: { type: String, maxlength: 200 },
    products: [CatalogSchema],
    total: { type: Number, required: true },
    status: { type: String, default: 'WAITING', enum: ["SOLD", "WAITING", "CANCELED"] },
    validUntil: { type: Date, required: true},
    paymentMethod: { type: String, enum: ["INVOICE", "CREDIT_CARD", "MONEY"] },
    createdBy: {type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'User', required: true },
    updatedBy: {type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'User' },
    },
    {
        versionKey: false,
        timestamps: true
    });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.QuoteSchema = schema;
module.exports.Quote = AlumisenaManagementContext.conn.model('Quote', schema);
