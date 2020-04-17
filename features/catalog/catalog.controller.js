const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers');
const catalogService = require('./catalog.service');
const { ObjectId } = require('mongodb');

class Controller {

    async list(ctx) {
        try {
            let res = await catalogService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            return onError('Error trying to list catalogs', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            const res = await catalogService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get catalog by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.code) return onBadRequest('Code cannot be null or empty', ctx);
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.price) return onBadRequest('Price cannot be null or empty', ctx);
            if (!ctx.request.body.quantity) return onBadRequest('Quantity cannot be null or empty', ctx);
            if (ctx.request.body.available === null) return onBadRequest('Available cannot be null or empty', ctx);

            ctx.request.body.createdBy = new ObjectId(ctx.request.body.createdBy);

            const response = await catalogService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            throw onError('Error trying to create catalog', e.toString(), ctx);
        }
    }

    async update(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);
            if (!ctx.request.body.code) return onBadRequest('Code cannot be null or empty', ctx);
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.price) return onBadRequest('Price cannot be null or empty', ctx);
            if (!ctx.request.body.quantity) return onBadRequest('Quantity cannot be null or empty', ctx);
            if (ctx.request.body.available === null) return onBadRequest('Available cannot be null or empty', ctx);

            ctx.request.body.updatedBy = new ObjectId(ctx.request.body.updatedBy);

            const response = await catalogService.updateOne(ctx.params.id, ctx.request.body);
            return onUpdated(ctx, response);
        } catch (e) {
            throw onError('Error trying to update catalog', e.toString(), ctx);
        }
    }

    async updateStock(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);
            if (!ctx.request.body.decreaseIn) return onBadRequest('Decrease in cannot be null or empty', ctx);

            const response = await catalogService.updateStock(ctx.params.id, ctx.request.body.decreaseIn);
            return onUpdated(ctx, response);
        } catch (e) {
            console.log('e :', e);
            throw onError('Error trying to update stock catalog', e.toString(), ctx);
        }
    }

    async delete(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

            await catalogService.deleteOne(ctx.params.id);
            return onNoContent(ctx);
        } catch (e) {
            throw onError('Error trying to delete catalog', e.toString(), ctx);
        }
    }
}

module.exports = new Controller();