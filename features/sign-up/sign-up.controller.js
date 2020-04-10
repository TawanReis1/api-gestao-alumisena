const UserController = require('../user/user.controller');
const { onError, onSuccess } = require('../../shared/handlers/');

class Controller {
    async signUp(ctx) {
        try {
            let createdUser = await UserController.create(ctx);
            return onSuccess({}, createdUser.response, createdUser.ctx);
        } catch (err) {
            onError('Error trying to sign-up', err.toString(), ctx);
        }
    }
}

module.exports = new Controller();