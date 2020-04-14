const { Report } = require('./report.model');

class Repository {

    find(query, paging) {
        return Report.find(query)
        .limit(paging.limit)
        .skip(paging.skip)
        .sort(paging.sort)
        .populate('createdBy')
        .lean();
    }

    findOne(id) {
        return Report.findOne({_id: id})
        .populate('createdBy')
        .populate('updatedBy');
    }

    create(report) {
        return Report.create(report);
    }

    countDocuments(query) {
        return Report.countDocuments(query);
    }

}

module.exports = new Repository();
