const { User } = require('./user.model');
const bcrypt = require('bcrypt');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');

class Service {
    getById(id) {
        return User.findOne({ _id: id });
    }

    findOne(conditons) {
        return User.findOne(conditons);
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await User.countDocuments(query);
        const data = await User.find(query).limit(paging.limit).skip(paging.skip).sort(paging.sort).lean();

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(user) {
        user.password = bcrypt.hashSync(user.password, 10);
        return User.create(user);
    }
}

module.exports = new Service();
