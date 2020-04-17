const { Catalog } = require('./catalog.model');

class Repository {

    find(query, paging) {
        return Catalog
        .find(query)
        .limit(paging.limit)
        .skip(paging.skip)
        .sort(paging.sort).lean();
    }

    findOne(id) {
        return Catalog
        .findOne({_id: id})
        .populate('createdBy')
        .populate('updatedBy');
    }

    getCatalogsBetweenDates(date) {
        return Catalog
        .find({createdAt: { $gte: date.initial, $lte: date.final }})
        .sort({createdAt: 1});
    }

    create(catalog) {
        return Catalog.create(catalog);
    }

    update(id, properties){
        console.log('properties :', properties);
        return Catalog.findOneAndUpdate({ _id: id }, properties)
    }

    updateStock(id, decreaseIn) {
        return Catalog.findOneAndUpdate({_id: id}, { $inc : { quantity: parseInt(decreaseIn) }})
    }

    delete(id) {
        return Catalog.delete({ _id: id });
    }

    countDocuments(query) {
        return Catalog.countDocuments(query);
    }
}

module.exports = new Repository();