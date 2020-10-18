import * as express from "express"
import * as fileStuff from "../../backend/fileStuff";
import * as Path from "path";
import { requireArgumentsPost, getUserPOST } from "../Routes";
const router = express.Router()

let filename = __filename.split(Path.sep)[__filename.split(Path.sep).length - 1].split(".");
let routeName = filename.slice(0, filename.length - 1).join(".");

router.route('/' + routeName + '/')
    .post(getUserPOST, requireArgumentsPost(["token","data"]), postRouteHandler);

function postRouteHandler(req:express.Request, res:express.Response) {
    fileStuff.saveUserData(req.body.token, req.header('x-forwarded-for') || req.socket.remoteAddress, req.body.data).then(response => {
        res.send(response)
    })
}

export = router;