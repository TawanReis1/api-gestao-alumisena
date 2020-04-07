const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers');
const quoteService = require('./quote.service');
const { ObjectId } = require('mongodb');

class Controller {

    async list(ctx) {
        try {
            let res = await quoteService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            console.log('e :', e);
            return onError('Error trying to list quotes', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            console.log('ctx.params.id :', ctx.params.id);
            const res = await quoteService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get quote by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            console.log('entrou aquii');
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.client) return onBadRequest('Client cannot be null or empty', ctx);
            if (!ctx.request.body.products && ctx.request.body.products.length > 0) return onBadRequest('Products cannot be null or empty', ctx);
            if (!ctx.request.body.total) return onBadRequest('Total cannot be null or empty', ctx);

            ctx.request.body.createdBy = new ObjectId(ctx.request.body.createdBy);

            const response = await quoteService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            throw onError('Error trying to create quote', e.toString(), ctx);
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

            const response = await quoteService.updateOne(ctx.params.id, ctx.request.body);
            return onUpdated(ctx, response);
        } catch (e) {
            throw onError('Error trying to update quote', e.toString(), ctx);
        }
    }

    async delete(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

            await quoteService.deleteOne(ctx.params.id);
            return onNoContent(ctx);
        } catch (e) {
            throw onError('Error trying to delete quote', e.toString(), ctx);
        }
    }
}

module.exports = new Controller();