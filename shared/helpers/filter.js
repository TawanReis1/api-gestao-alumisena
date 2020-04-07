const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

class FilterHelper {
    regexExpression(search, field="") {
        if (!search) {
            return false;
        }

        if (search === 'true') {
            return true;
        }

        if (search === 'false') {
            return false;
        }

        if (field === 'clientId') {
            return {clientId: ObjectId(search)}
        }

        return {
            $regex: search,
            $options: 'i',
        };
    }

    regexExpressionObjectId(search) {
        if (!search) {
            return false;
        }

        return mongoose.Types.ObjectId(search);
    }

    build(query = {}) {
        const filters = {};

        Object.keys(query).forEach((prop) => {
            if (prop.match('filter_')) {
                if (prop.match('_id')) filters[prop.replace('filter_', '').replace('_id', '')] = this.regexExpressionObjectId(query[prop])
                else if (prop.includes('Id')) {
                    filters[prop.replace('filter_', '').replace('_id', '')] = this.regexExpressionObjectId(query[prop], 'clientId')
                } else {
                    filters[prop.replace('filter_', '')] = this.regexExpression(query[prop]);
                } 
            }
        });

        return filters;
    }
}

module.exports = new FilterHelper();
