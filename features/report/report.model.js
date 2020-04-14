const AlumisenaManagementContext = require('../../shared/alumisena-management-context');
const { ClientSchema } = require('../client/client.model');
const { CatalogSchema } = require('../catalog/catalog.model');
const { SaleSchema } = require('../sale/sale.model');

const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    clients: [ClientSchema],
    catalogs: [CatalogSchema],
    sales: [SaleSchema],
    type: { type: String, enum: ["CLIENT", "CATALOG", "SALE"], required: true },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
},
    {
        versionKey: false,
        timestamps: true
    });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.ReportSchema = schema;
module.exports.Report = AlumisenaManagementContext.conn.model('Report', schema);
