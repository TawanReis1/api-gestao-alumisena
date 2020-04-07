const { Report } = require('./report.model');

class Repository {

    find(query, paging) {
        return Report.find(query)
        .limit(paging.limit)
        .skip(paging.skip)
        .sort(paging.sort)
        .lean();
    }

    findOne(id) {
        return Report.findOne({_id: id});
    }

    create(report) {
        return Report.create(report);
    }

}

module.exports = new Repository();
