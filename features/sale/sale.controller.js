const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers');
const saleService = require('./sale.service');
const { ObjectId } = require('mongodb');

class Controller {

    async list(ctx) {
        try {
            let res = await saleService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            return onError('Error trying to list sales', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            const res = await saleService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get sale by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.client) return onBadRequest('Client cannot be null or empty', ctx);
            if (!ctx.request.body.products && ctx.request.body.products.length > 0) return onBadRequest('Products cannot be null or empty', ctx);
            if (!ctx.request.body.total) return onBadRequest('Total cannot be null or empty', ctx);

            ctx.request.body.createdBy = new ObjectId(ctx.request.body.createdBy);
            ctx.request.body.total = ctx.request.body.total.toFixed(2);

            const response = await saleService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            console.log('e :', e);
            throw onError('Error trying to create sale', e.toString(), ctx);
        }
    }

    async update(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.client) return onBadRequest('Client cannot be null or empty', ctx);
            if (!ctx.request.body.products && ctx.request.body.products.length > 0) return onBadRequest('Products cannot be null or empty', ctx);
            if (!ctx.request.body.total) return onBadRequest('Total cannot be null or empty', ctx);

            ctx.request.body.updatedBy = new ObjectId(ctx.request.body.updatedBy);
            ctx.request.body.total = ctx.request.body.total.toFixed(2);

            const response = await saleService.updateOne(ctx.params.id, ctx.request.body);
            return onUpdated(ctx, response);
        } catch (e) {
            throw onError('Error trying to update sale', e.toString(), ctx);
        }
    }

    async delete(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

            await saleService.deleteOne(ctx.params.id);
            return onNoContent(ctx);
        } catch (e) {
            throw onError('Error trying to delete sale', e.toString(), ctx);
        }
    }
}

module.exports = new Controller();