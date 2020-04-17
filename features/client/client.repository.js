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

    getClientsBetweenDates(date) {
        return Client
        .find({createdAt: { $gte: date.initial, $lte: date.final }})
        .sort({createdAt: 1});
    }

    create(catalog) {
        return Client.create(catalog);
    }

    update(id, properties){
        return Client.findOneAndUpdate({ _id: id }, properties)
    }

    delete(id) {
        return Client.delete({ _id: id });
    }

    countDocuments(query) {
        return Client.countDocuments(query);
    }
}

module.exports = new Repository();