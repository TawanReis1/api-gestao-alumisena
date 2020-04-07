const catalogRepository = require('./catalog.repository');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');

class Service {
    
    getById(id) {
        return catalogRepository.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await catalogRepository.countDocuments(query);
        const data = await catalogRepository.find(query, paging);

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(catalog) {
        return catalogRepository.create(catalog);
    }

    deleteOne(id) {
        return catalogRepository.delete({ _id: id });
    }

    updateOne(id, properties) {
        return catalogRepository.updateOne({ _id: id }, properties)
    }
}

module.exports = new Service();
