
import { checkPath, User, UserRequestAnswer } from "../util";
import * as loginBackend from "../UserMangement"
import { db } from "../..";

function loadTime(path:string, token:string, ip:string, user:UserRequestAnswer = null) : number {
    let pathCeck = checkPath(path)
    if (!pathCeck.status)
        return 0
    path = pathCeck.data    
    if (user === null ) {
        user = loginBackend.getUserFromToken(token, ip)
        if (!user["status"])
            return -1
    }
    let data = db.prepare("SELECT * FROM status WHERE UUID=? AND path=?").get(user.data.uuid, path)
    if (data === undefined)
        return 0;
    else 
        return data["data"]
}

export {loadTime}