const Router = require('koa-router');
const controller = require('./user.controller');
const guard = require('../../shared/middlewares/alumisena-management-middleware');

const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/user`);

routes.get('/', guard.Authorize, controller.list);
routes.get('/:id', guard.Authorize, controller.getById);
routes.post('/', guard.Authorize, controller.create);

module.exports = routes;
