const clientRepository = require('./client.repository')
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

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(client) {
        return clientRepository.create(client);
    }

    deleteOne(id) {
        return clientRepository.delete({ _id: id });
    }

    updateOne(id, properties) {
        return clientRepository.updateOne({ _id: id }, properties)
    }
}

module.exports = new Service();
