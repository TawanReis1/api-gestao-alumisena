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
        return Client.findOne({_id: id});
    }

    create(catalog) {
        return Client.create(catalog);
    }

    update(id, properties){
        return Client.updateOne({ _id: id }, properties)
    }


    countDocuments(query) {
        return Client.countDocuments(query);
    }
}

module.exports = new Repository();