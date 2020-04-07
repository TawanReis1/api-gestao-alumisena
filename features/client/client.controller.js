const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers');
const clientService = require('./client.service');
const { ObjectId } = require('mongodb');

class Controller {

    async list(ctx) {
        try {
            let res = await clientService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            console.log('e :', e);
            return onError('Error trying to list clients', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            console.log('ctx.params.id :', ctx.params.id);
            const res = await clientService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get client by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.birthFundationDate) return onBadRequest('Date of Birth cannot be null or empty', ctx);
            if (!ctx.request.body.cpfCnpj) return onBadRequest('CPF cannot be null or empty', ctx);
            if (!ctx.request.body.telephone) return onBadRequest('Telephone cannot be null or empty', ctx);
            if (!ctx.request.body.street) return onBadRequest('Street cannot be null or empty', ctx);
            if (!ctx.request.body.city) return onBadRequest('City cannot be null or empty', ctx);
            if (!ctx.request.body.neighborhood) return onBadRequest('Neighborhood cannot be null or empty', ctx);
            if (!ctx.request.body.cep) return onBadRequest('CEP cannot be null or empty', ctx);
            
            ctx.request.body.createdBy = new ObjectId(ctx.request.body.createdBy);

            const response = await clientService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            console.log('e :', e);
            throw onError('Error trying to create client', e.toString(), ctx);
        }
    }

    async update(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.birthFundationDate) return onBadRequest('Date of Birth cannot be null or empty', ctx);
            if (!ctx.request.body.cpfCnpj) return onBadRequest('CPF cannot be null or empty', ctx);
            if (!ctx.request.body.telephone) return onBadRequest('Telephone cannot be null or empty', ctx);
            if (!ctx.request.body.street) return onBadRequest('Street cannot be null or empty', ctx);
            if (!ctx.request.body.city) return onBadRequest('City cannot be null or empty', ctx);
            if (!ctx.request.body.neighborhood) return onBadRequest('Neighborhood cannot be null or empty', ctx);
            if (!ctx.request.body.cep) return onBadRequest('CEP cannot be null or empty', ctx);

            ctx.request.body.updatedBy = new ObjectId(ctx.request.body.updatedBy);
            
            const response = await clientService.updateOne(ctx.params.id, ctx.request.body);
            return onUpdated(ctx, response);
        } catch (e) {
            throw onError('Error trying to update client', e.toString(), ctx);
        }
    }

    async delete(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

            await clientService.deleteOne(ctx.params.id);
            return onNoContent(ctx);
        } catch (e) {
            throw onError('Error trying to delete client', e.toString(), ctx);
        }
    }
}

module.exports = new Controller();