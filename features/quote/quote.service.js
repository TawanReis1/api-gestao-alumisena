const quoteRepository = require('./quote.repository')
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');

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
