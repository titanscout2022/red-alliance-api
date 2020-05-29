/**
 * GET route '/api/fetchAllTeamNicknamesAtCompetition'
 * Allows the application to fetch the nicknames for all the teams which are at a competition. (For example, Team 2022 = Titan Robotics)
 * @param competition is the identifier for the competition: e.g. '2020ilch'.
 * @returns back to the client let resobj (competition id, JSON of the team number and nicknames) and HTTP Status Code 200 OK.
 */
module.exports = (app, dbHandler) => {
    app.get('/api/fetchAllTeamNicknamesAtCompetition', async (req: any, res:any) => {
        let val;
        const competition = String(req.query.competition);
        try {
        val = await dbHandler.fetchAllTeamNicknamesAtCompetition(req.db, competition).catch((e) => { console.error(e); val.err_occur = true; });
        } catch (e) {
        console.error(e);
        val.err_occur = true;
        }
        let resobj = null;
        if (val.err_occur === false) {
        resobj = {
            success: true,
            competition,
            data: val.data,
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