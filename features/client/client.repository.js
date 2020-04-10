const { Client } = require('./client.model');

class Repository {

    find(query, paging) {
        return Client.find(query)
        .limit(paging.limit)
        .skip(paging.skip)
        .sort(paging.sort)
        .lean();
    }

    findOne(id) {
        return Client
        .findOne({_id: id})
        .populate('createdBy')
        .populate('updatedBy');
    }

    create(catalog) {
        return Client.create(catalog);
    }

    update(id, properties){
        return Client.updateOne({ _id: id }, properties)
    }

    delete(id) {
        return Client.delete({ _id: id });
    }

    countDocuments(query) {
        return Client.countDocuments(query);
    }
}

module.exports = new Repository();