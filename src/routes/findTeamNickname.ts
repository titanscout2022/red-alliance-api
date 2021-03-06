import { validate, Joi } from 'express-validation';
import UserReturnData from '../UserReturnData';
import StatusCodes from '../StatusCodes';
/**
 * GET route '/api/findTeamNickname'
 * Allows the application to get the nickname for a team, given the team number.
 * @param teamNum is the FRC team number: e.g. '2022'.
 * @returns back to the client let resobj (team number and nickname) and HTTP Status Code 200 OK.
*/

module.exports = (app: any, dbHandler: any) => {
  const validation = {
    query: Joi.object({
      team: Joi.string().required(),
    }),
  }
  app.get('/api/findTeamNickname', validate(validation, { keyByField: true }, { allowUnknown: true }), async (req: any, res:any) => {
    const val: UserReturnData = new UserReturnData();
    const competition = '2020ilch';
    const teamNumber = req.query.team;
    const interim = await dbHandler.fetchAllTeamNicknamesAtCompetition(req.db, competition).catch((e) => { console.error(e); val.err_occur = true; });
    val.data = { team_nickname: interim.data[teamNumber] };
    if (val.err_occur === false) {
      res.json({
        success: true,
        competition,
        data: val.data,
      });
    } else {
      res.status(StatusCodes.no_data).json({
        success: false,
        reasons: val.err_reasons,
      });
    }
  });
};
