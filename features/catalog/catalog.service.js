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

    getCatalogsBetweenDates(date) {
        return catalogRepository.getCatalogsBetweenDates(date);
    }

    create(catalog) {
        return catalogRepository.create(catalog);
    }

    updateOne(id, properties) {
        return catalogRepository.update(id, properties);
    }

    async updateStock(id, decreaseIn) {
        let productUpdated = await catalogRepository.updateStock(id, decreaseIn);

        if (productUpdated.quantity + decreaseIn <= 0) {
            let productUpdate2 = await this.updateOne(id, {available: false});
            console.log('productUpdate2 :', productUpdate2);
        }

        return productUpdated;
    }

    deleteOne(id) {
        return catalogRepository.delete(id);
    }
}

module.exports = new Service();
