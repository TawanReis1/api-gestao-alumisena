const Router = require('koa-router');
const controller = require('./sale.controller');
const guard = require('../../shared/middlewares/alumisena-management-middleware');

const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/sale`);

routes.get('/', guard.Authorize, controller.list);
routes.get('/:id', guard.Authorize, controller.getById);
routes.post('/', guard.Authorize, controller.create);
routes.put('/:id', guard.Authorize, controller.update);
routes.delete('/:id', guard.Authorize, controller.delete);

module.exports = routes;
