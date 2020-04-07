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
        return Catalog.findOne({_id: id});
    }

    create(catalog) {
        return Catalog.create(catalog);
    }

    update(id, properties){
        return Catalog.updateOne({ _id: id }, properties)
    }

    countDocuments(query) {
        return Catalog.countDocuments(query);
    }
}

module.exports = new Repository();