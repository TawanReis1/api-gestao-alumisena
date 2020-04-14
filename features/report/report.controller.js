const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers');
const reportService = require('./report.service');
const { ObjectId } = require('mongodb');

class Controller {

    async list(ctx) {
        try {
            let res = await reportService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            return onError('Error trying to list reports', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            const res = await reportService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get report by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.type) return onBadRequest('Type cannot be null or empty', ctx);
            if (!ctx.request.body.dateRange) return onBadRequest('Date Range cannot be null or empty', ctx);

            ctx.request.body.createdBy = new ObjectId(ctx.request.body.createdBy);

            const response = await reportService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            console.log('e :', e);
            throw onError('Error trying to create report', e.toString(), ctx);
        }
    }
}

module.exports = new Controller();