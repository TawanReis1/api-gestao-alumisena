const catalogRoutes = require('../features/catalog/catalog.route');
const clientRoutes = require('../features/client/client.route');
const saleRoutes = require('../features/sale/sale.route');
const reportRoutes = require('../features/report/report.route');
const userRoutes = require('../features/user/user.route');

class Routing {
  resolve(app) {
    app.use(catalogRoutes.routes());
    app.use(clientRoutes.routes());
    app.use(saleRoutes.routes());
    app.use(reportRoutes.routes());
    app.use(userRoutes.routes());
  }
}

module.exports = new Routing();
