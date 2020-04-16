const reportRepository = require('./report.repository');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
const clientService = require('../client/client.service');
const catalogService = require('../catalog/catalog.service');
const saleService = require('../sale/sale.service');

class Service {
    getById(id) {
        return reportRepository.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await reportRepository.countDocuments(query);
        const data = await reportRepository.find(query, paging);

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    async create(informations) {
        informations.dateRange.initial = `${informations.dateRange.initial}T00:00:00+00:00`;
        informations.dateRange.initial = new Date(informations.dateRange.initial);

        informations.dateRange.final = `${informations.dateRange.final}T23:59:00+00:00`;
        informations.dateRange.final = new Date(informations.dateRange.final);

        let data = {};
        switch(informations.type) {
            case 'CLIENT':
                data.clients = await clientService.getClientsBetweenDates(informations.dateRange);

                break;
            case 'CATALOG':
                data.catalogs = await catalogService.getCatalogsBetweenDates(informations.dateRange);

                break;
            case 'SALE':
                data.sales = await saleService.getSalesBetweenDates(informations.dateRange);

                break;            
        }

        data.name = informations.name;
        data.dateRangeInitial = informations.dateRange.initial;
        data.dateRangeFinal = informations.dateRange.final;
        data.type = informations.type;
        data.createdBy = informations.createdBy;
        
        return reportRepository.create(data);
    }
}

module.exports = new Service();
