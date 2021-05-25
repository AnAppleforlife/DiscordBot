import * as express from 'express';
import * as fileStuff from '../../backend/fileStuff';
import * as Path from 'path';
import { getUser } from '../Routes';
const router = express.Router();

const filename = __filename.split(Path.sep)[__filename.split(Path.sep).length - 1].split('.');
const routeName = filename.slice(0, filename.length - 1).join('.');

router.route('/' + routeName + '/')
    .get(getUser(true), postRouteHandler);

function postRouteHandler(req:express.Request, res:express.Response) {
    const answer = fileStuff.getSortTypes();
    res.send(answer);
}

export = router;