const clientRepository = require('./client.repository');
const saleService = require('../sale/sale.service');
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
            const saleInformationByClient = await saleService.getAllSalesByClient(client._id);
            console.log('saleInformationByClient :', JSON.stringify(saleInformationByClient, null, 4));

            client.totalSpent = saleInformationByClient.totalSpent;
            client.orderQuantity = saleInformationByClient.allSales;
        }

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    getClientsBetweenDates(date) {
        return clientRepository.getClientsBetweenDates(date);
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
