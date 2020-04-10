const clientRepository = require('./client.repository');
const quoteService = require('../quote/quote.service');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');

class Service {
    getById(id) {
        return clientRepository.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await clientRepository.countDocuments(query);
        const data = await clientRepository.find(query, paging);

        for (const client of data) {
            const quoteInformationByClient = await quoteService.getAllQuotesByClient(client._id);

            client.totalSpent = quoteInformationByClient.totalSpent;
            client.orderQuantity = quoteInformationByClient.allQuotes;
        }

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(client) {
        return clientRepository.create(client);
    }

    updateOne(id, properties) {
        return clientRepository.update(id, properties)
    }

    deleteOne(id) {
        return clientRepository.delete(id);
    }
}

module.exports = new Service();
