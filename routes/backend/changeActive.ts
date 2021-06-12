import * as express from 'express';
import * as loginBackend from '../../backend/UserMangement';
import * as Path from 'path';
import { requireArguments, getUser } from '../Routes';
const router = express.Router();

const filename = __filename.split(Path.sep)[__filename.split(Path.sep).length - 1].split('.');
const routeName = filename.slice(0, filename.length - 1).join('.');

router.route('/' + routeName + '/')
    .post(requireArguments(['token', 'state', 'uuid']), getUser(true) ,postRouteHandler);

function postRouteHandler(req:express.Request, res:express.Response) {
    if (res.locals.user['perm'] === 'Admin') {
        if (typeof req.body.state === "boolean")
            req.body.state = req.body.state ? 1 : 0
        const response = loginBackend.changeActiveState(req.body.state, req.body.uuid, req.body.token, req.header('x-forwarded-for') || req.socket.remoteAddress);
        res.send(response);
    } else 
        res.send({'status' : false});
}

export = router;