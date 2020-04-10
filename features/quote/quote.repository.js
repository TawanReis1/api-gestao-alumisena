const { Quote } = require('./quote.model');

class Repository {

    find(query, paging) {
        return Quote.find(query)
        .limit(paging.limit)
        .skip(paging.skip)
        .sort(paging.sort)
        .lean();
    }

    findOne(id) {
        return Quote.findOne({_id: id});
    }

    findApprovedByClient(clientId) {
        return Quote.find({client: clientId, status: "SOLD"})
    }

    create(catalog) {
        return Quote.create(catalog);
    }

    update(id, properties){
        return Quote.updateOne({ _id: id }, properties)
    }

    delete(id) {
        return Quote.delete({ _id: id });
    }


    countDocuments(query) {
        return Quote.countDocuments(query);
    }

}

module.exports = new Repository();
