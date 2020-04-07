const AlumisenaManagementContext = require('../../shared/alumisena-management-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 200 },
    type: { type: String, default: 'PRIVATE_INDIVIDUAL', enum: ["LEGAL_ENTITY", "PRIVATE_INDIVIDUAL"] },
    userId: {type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'User', required: true },
    address: { type: String, required: true, maxlength: 100 },
    telephone: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true, unique: true, maxlength: 200 },
},
    {
        versionKey: false,
        timestamps: true
    });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.ReportSchema = schema;
module.exports.Report = AlumisenaManagementContext.conn.model('Report', schema);
