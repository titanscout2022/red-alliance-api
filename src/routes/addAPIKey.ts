import uuidAPIKey from 'uuid-apikey'
import UserReturnData from './UserReturnData'
/**
 * POST route '/api/addAPIKey'
 * Allows the creation of API keys from current OAuth users.
 * @param token in form of header with title 'token' and value of JWT provided by Google OAuth
 * @returns back to the client let resobj (success, client id, and client secret generated) and HTTP Status Code 200 OK.
 */
module.exports = (app, dbHandler, auth) => {
    app.post('/api/addAPIKey', auth.noAPIKey, auth.checkAuth, async (req: any, res:any) => {
        let val: UserReturnData =  new UserReturnData();
        const clientInfo = await uuidAPIKey.create();
        try {
          val.data = await dbHandler.addKey(req.db, clientInfo.uuid, clientInfo.apiKey).catch((e) => { console.error(e); val.err_occur = true; });
        } catch (err) {
          console.error(err);
          val.err_occur = true;
        }
        let resobj = null;
        if (val.err_occur === false) {
          resobj = {
            success: true,
            CLIENT_ID: clientInfo.uuid,
            CLIENT_SECRET: clientInfo.apiKey,
          };
        } else {
          resobj = {
            success: false,
            reasons: val.err_reasons,
          };
        }
        res.json(resobj);
    });
}