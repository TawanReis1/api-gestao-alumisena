const saleRepository = require('./sale.repository')
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
const { ObjectId } = require('mongodb');


class Service {
    getById(id) {
        return saleRepository.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await saleRepository.countDocuments(query);
        const data = await saleRepository.find(query, paging);

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    async getAllSalesByClient(clientId) {
        clientId = ObjectId(clientId);
        let data = {};
        
        let allApprovedSales = await saleRepository.findApprovedByClient(clientId);
        let allSales = await saleRepository.countDocuments({client: clientId});

        let aux = 0;

        allApprovedSales.forEach(approvedSale => {
            aux += approvedSale.total;
        });

        data.totalSpent = aux;
        data.allSales = allSales;

        return data;
    }

    getSalesBetweenDates(date) {
        return saleRepository.getSalesBetweenDates(date);
    }


    create(sale) {
        return saleRepository.create(sale);
    }

    updateOne(id, properties) {
        return saleRepository.update(id, properties)
    }

    deleteOne(id) {
        return saleRepository.delete(id);
    }
}

module.exports = new Service();
