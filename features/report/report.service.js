const reportRepository = require('./report.repository');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
const clientService = require('../client/client.service');
const catalogService = require('../catalog/catalog.service');
const saleService = require('../sale/sale.service');

class Service {
    getById(id) {
        return reportRepository.findOne(id);
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
        informations.dateRange.initial = `${informations.dateRange.initial}T00:00:00-03:00`;
        informations.dateRange.initial = new Date(informations.dateRange.initial);

        informations.dateRange.final = `${informations.dateRange.final}T23:59:00-03:00`;
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
                let allSales = await saleService.getSalesBetweenDates(informations.dateRange);
                data.sales = allSales;

                let allProductsSold = [];

                let moneyAux = 0;

                let clientAux;
                let clientCount = {}
                let compareClient = 0
                let mostFrequentClient;

                let mostFrequentProducts = []
                let productAux;
                let productCount = {}
                let compareProduct = 0
                let mostFrequentProduct;

                allSales.forEach(sale => {
                    moneyAux += sale.total;

                    clientAux = sale.client;

                    if (clientCount[clientAux] === undefined) {
                        clientCount[clientAux] = 1;
                    } else {
                        clientCount[clientAux] += 1;
                    }

                    if (clientCount[clientAux] > compareClient) {
                        compareClient = clientCount[clientAux]
                        mostFrequentClient = sale.client;
                    }

                    sale.products.forEach(product => {
                        productAux = product._id;

                        if (productCount[productAux] === undefined) {
                            productCount[productAux] = 1;
                        } else {
                            productCount[productAux] += 1;
                        }

                        if (productCount[productAux] > compareProduct) {
                            compareProduct = productCount[productAux];
                            mostFrequentProduct = product._id;
                        }
                        mostFrequentProducts.push(mostFrequentProduct);
                    });

                    allProductsSold.push(...sale.products);
                });

                let mostFrequentProductsAux;
                let mostFrequentProductsCount = {}
                let compareMostFrequentProducts = 0
                let mostFrequentProductsResult;
                mostFrequentProducts.forEach(mostFrequentProduct => {
                    mostFrequentProductsAux = mostFrequentProduct;

                    if (mostFrequentProductsCount[mostFrequentProductsAux] === undefined) {
                        mostFrequentProductsCount[mostFrequentProductsAux] = 1;
                    } else {
                        mostFrequentProductsCount[mostFrequentProductsAux] += 1;
                    }

                    if (mostFrequentProductsCount[mostFrequentProductsAux] > compareMostFrequentProducts) {
                        compareMostFrequentProducts = mostFrequentProductsCount[mostFrequentProductsAux]
                        mostFrequentProductsResult = mostFrequentProduct;
                    }
                });

                let allProductsSoldFiltered = allProductsSold.filter(productSold => String(productSold._id) == mostFrequentProductsResult);

                let auxQuantity = 0
                allProductsSoldFiltered.forEach(product => {
                    auxQuantity += product.quantity;
                })

                data.totalCollected = moneyAux.toFixed(2);
                data.wholeQuantity = auxQuantity;
                data.bestClient = mostFrequentClient;
                data.bestSellingItem = mostFrequentProductsResult;

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
