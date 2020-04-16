const { Sale } = require('./sale.model');

class Repository {

    find(query, paging) {
        return Sale.find(query)
        .limit(paging.limit)
        .skip(paging.skip)
        .sort(paging.sort)
        .populate('client')
        .lean();
    }

    findOne(id) {
        return Sale
        .findOne({_id: id})
        .populate('client')
        .populate('createdBy')
        .populate('updatedBy');
    }

    findApprovedByClient(clientId) {
        return Sale.find({client: clientId, status: "SOLD"})
    }

    getSalesBetweenDates(date) {
        return Sale
        .find({createdAt: { $gte: date.initial, $lte: date.final }})
        .sort({createdAt: 1});
    }

    create(sale) {
        return Sale.create(sale);
    }

    update(id, properties){
        return Sale.updateOne({ _id: id }, properties)
    }

    delete(id) {
        return Sale.delete({ _id: id });
    }


    countDocuments(query) {
        return Sale.countDocuments(query);
    }

}

module.exports = new Repository();
