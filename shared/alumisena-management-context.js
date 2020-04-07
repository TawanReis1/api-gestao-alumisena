const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

const mongoConfig = {
    useNewUrlParser: true,
    autoReconnect: true
}

class AlumisenaManagementContext {

    static get conn() {
        if (!AlumisenaManagementContext.connection) {
            AlumisenaManagementContext.connect()         
        }
        return AlumisenaManagementContext.connection;
    }

    static connect() {
        const cs = process.env.MONGO_ALUMISENA_MANAGEMENT;
        AlumisenaManagementContext.connection = Mongoose.createConnection(cs, mongoConfig);
    }
}

module.exports = AlumisenaManagementContext;
