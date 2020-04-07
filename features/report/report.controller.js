const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers');
const reportService = require('./report.service');
const { ObjectId } = require('mongodb');

class Controller {

    async list(ctx) {
        try {
            let res = await reportService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            console.log('e :', e);
            return onError('Error trying to list clients', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            console.log('ctx.params.id :', ctx.params.id);
            const res = await reportService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get client by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.address) return onBadRequest('Address cannot be null or empty', ctx);
            if (!ctx.request.body.telephone) return onBadRequest('Telephone cannot be null or empty', ctx);
            if (!ctx.request.body.email) return onBadRequest('Email cannot be null or empty', ctx);

            ctx.request.body.userId = new ObjectId(ctx.request.body.userId);

            const response = await reportService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            throw onError('Error trying to create client', e.toString(), ctx);
        }
    }

    // async update(ctx) {
    //     try {
    //         if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);
    //         if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
    //         if (!ctx.request.body.address) return onBadRequest('Address cannot be null or empty', ctx);
    //         if (!ctx.request.body.telephone) return onBadRequest('Telephone cannot be null or empty', ctx);
    //         if (!ctx.request.body.email) return onBadRequest('Email cannot be null or empty', ctx);

    //         const response = await reportService.updateOne(ctx.params.id, ctx.request.body);
    //         return onUpdated(ctx, response);
    //     } catch (e) {
    //         throw onError('Error trying to update client', e.toString(), ctx);
    //     }
    // }

    // async delete(ctx) {
    //     try {
    //         if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

    //         await reportService.deleteOne(ctx.params.id);
    //         return onNoContent(ctx);
    //     } catch (e) {
    //         throw onError('Error trying to delete client', e.toString(), ctx);
    //     }
    // }
}

module.exports = new Controller();