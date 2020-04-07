const reportRepository = require('./report.repository')
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');

class Service {
    getById(id) {
        return reportRepository.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await reportRepository.countDocuments(query);
        const data = await reportRepository.find(query, paging);

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(report) {
        return reportRepository.create(report);
    }

    // deleteOne(id) {
    //     return Client.delete({ _id: id });
    // }

    // updateOne(id, properties) {
    //     return Client.updateOne({ _id: id }, properties)
    // }
}

module.exports = new Service();
