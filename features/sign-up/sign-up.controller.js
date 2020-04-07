const UserController = require('../user/user.controller');
const { onError, onSuccess } = require('../../shared/handlers/');

class Controller {
    async signUp(ctx) {
        try {
            let createdUser = await UserController.create(ctx);
            return onSuccess({}, createdUser.response, createdUser.ctx);
        } catch (err) {
            console.log('err :', JSON.stringify(err, null, 4));
            onError('Error trying to sign-up', err.toString(), ctx);
        }
    }
}

module.exports = new Controller();