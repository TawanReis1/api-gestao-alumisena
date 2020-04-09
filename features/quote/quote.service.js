const quoteRepository = require('./quote.repository')
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
const { ObjectId } = require('mongodb');


class Service {
    getById(id) {
        return quoteRepository.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await quoteRepository.countDocuments(query);
        const data = await quoteRepository.find(query, paging);

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    async getAllQuotesByClient(clientId) {
        clientId = ObjectId(clientId);
        let data = {};
        
        let allApprovedQuotes = await quoteRepository.findApprovedByClient(clientId);
        let allQuotes = await quoteRepository.countDocuments({client: clientId});

        let aux = 0;

        allApprovedQuotes.forEach(approvedQuote => {
            aux += approvedQuote.total;
        });

        data.totalSpent = aux;
        data.allQuotes = allQuotes;

        return data;
    }

    create(quote) {
        return quoteRepository.create(quote);
    }

    deleteOne(id) {
        return quoteRepository.delete({ _id: id });
    }

    updateOne(id, properties) {
        return quoteRepository.updateOne({ _id: id }, properties)
    }
}

module.exports = new Service();
