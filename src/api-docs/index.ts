import * as addAPIKey from './addAPIKey.json';
import * as addScouterToMatch from './addScouterToMatch.json';
import * as addUserToTeam from './addUserToTeam.json';

export default {
  swagger: '2.0',
  info: {
    version: '0.11.0',
    title: 'The Red Alliance API',
    description: 'An API to submit and retrieve data for and from The Red Alliance family of products.',
    license: {
      name: 'Licensed under the BSD 3-Clause license',
      url: 'https://raw.githubusercontent.com/titanscouting/red-alliance-api/master/LICENSE',
    },
  },
  definitions: {
    NoAuth: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false,
        },
        reason: {
          type: 'string',
          example: 'User could not be authenticated',
        },
      },
    },
    KeysNotAllowed: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false,
        },
        reason: {
          type: 'string',
          example: 'This route does not allow authentication via API key',
        },
      },
    },
    NoData: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false,
        },
        reasons: {
          type: 'array',
          example: [
            'Could not connect to the DB',
          ],
        },
      },
    },
  },
  components: {
    securitySchemes: {
      GoogleAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'token',
        description: 'Use the Backend Authenticaation JWT provided to you by the frontend Google OAuth flow.',
      },
      CLIENT_ID: {
        type: 'apiKey',
        in: 'header',
        name: 'CLIENT_ID',
        description: 'Use the Client ID issued to you. MUST BE USED IN CONJUNCTION WITH CLIENT_SECRET.',
      },
      CLIENT_SECRET: {
        type: 'apiKey',
        in: 'query',
        name: 'CLIENT_SECRET',
        description: 'Use the Client secret issued to you. MUST BE USED IN CONJUNCTION WITH CLIENT_ID.',
      },
    },
  },
  servers: [
    {
      url: 'https://titanscouting.epochml.org',
      description: 'Production environment',
    },
  ],
  tags: [
    {
      name: 'Authenticated Routes',
      description: 'Routes which require authentication to interact with',
    },
    {
      name: 'Non-Authenticated Routes',
      description: 'Routes which do not require authentication to interact with',
    },
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  paths: {
    '/api/addAPIKey': addAPIKey,
    '/api/addScouterToMatch': addScouterToMatch,
    '/api/addUserToTeam': addUserToTeam,
    '/api/fetchTeamSchedule': {
      get: {
        summary: "Get the schedule for the user's team",
        description: "Returns the competition schedule for the user's team",
        tags: [
          'Authenticated Routes',
        ],
        security: [
          {
            GoogleAuth: [],
          },
        ],
        parameters: [
          {
            in: 'query',
            name: 'competition',
            required: true,
            description: 'FRC competition ID.',
            schema: {
              type: 'string',
              example: '2020ilch',
            },
          },
        ],
        responses: {
          200: {
            description: 'The team competition schedule was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
                team: {
                  type: 'string',
                  example: '2022',
                },
                data: {
                  type: 'object',
                  example: [{
                    _id: '5e61b638a3dfe2b512d4ff73',
                    teams: [
                      '2022',
                      '1781',
                      '930',
                      '2039',
                      '63',
                      '4296',
                    ],
                    scouters: [
                      {
                        name: 'John Doe',
                        id: '118039453938298350000',
                      },
                      {
                        name: 'Jane Doe',
                        id: '109539256606510070000',
                      },
                      {
                        name: 'John Doe',
                        id: '115872669838441320000',
                      },
                      {
                        name: 'Jane Doe',
                        id: '113332030113723820000',
                      },
                      false,
                      false,
                    ],
                    match: 64,
                    competition: '2020ilch',
                  }],
                },
              },
            },
          },
          400: {
            description: 'The 2022 competition schedule could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchPitConfig': {
      get: {
        summary: "Get the pit scouting configuration for the user's team",
        description: "Get the pit scouting configuration for the user's team",
        tags: [
          'Authenticated Routes',
        ],
        security: [
          {
            GoogleAuth: [],
          },
        ],
        parameters: [
          {
            in: 'query',
            name: 'competition',
            required: true,
            description: 'FRC competition ID.',
            schema: {
              type: 'string',
              example: '2020ilch',
            },
          },
        ],
        responses: {
          200: {
            description: 'The team pit scouting configuration was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
                team: {
                  type: 'string',
                  example: '2022',
                },
                config: {
                  type: 'object',
                  example: [
                    {
                      Pit: [
                        {
                          name: 'Updated on Match',
                          key: 'match-updated',
                          widget: 'stepper',
                        },
                        {
                          name: 'Can do low balls?',
                          key: 'low-balls',
                          widget: 'segment',
                          options: [
                            "Don't Know",
                            'Yes',
                            'No',
                          ],
                        },
                        {
                          name: 'Can do high balls?',
                          key: 'high-balls',
                          widget: 'segment',
                          options: [
                            "Don't Know",
                            'Yes',
                            'No',
                          ],
                        },
                        {
                          name: 'Has wheel mechanism?',
                          key: 'wheel-mechanism',
                          widget: 'segment',
                          options: [
                            "Don't Know",
                            'Yes',
                            'No',
                          ],
                        },
                        {
                          name: 'Demonstrated wheel success?',
                          key: 'wheel-success',
                          widget: 'segment',
                          options: [
                            "Don't Know",
                            'Yes',
                            'No',
                          ],
                        },
                        {
                          name: 'Strategic focus',
                          key: 'strategic-focus',
                          widget: 'segment',
                          options: [
                            'Unknown',
                            'Offense',
                            'Defense',
                            'Hybrid',
                          ],
                        },
                        {
                          name: 'Climb mechanism',
                          key: 'climb-mechanism',
                          widget: 'segment',
                          options: [
                            "Don't Know",
                            'x0',
                            'x1',
                            'x2',
                            'x3',
                          ],
                        },
                        {
                          name: 'Climb requirements (space? time?)',
                          key: 'climb-requirements',
                          widget: 'text-area',
                        },
                        {
                          name: 'Attitude toward Titan Robotics',
                          key: 'attitude',
                          widget: 'segment',
                          options: [
                            "Don't Know",
                            'Negative',
                            'Neutral',
                            'Positive',
                            'Love',
                          ],
                        },
                        {
                          name: 'Other notes',
                          key: 'defense-notes',
                          widget: 'text-area',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: 'The pit configuration could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/getUserTeam': {
      get: {
        summary: 'Get user team association',
        description: 'Returns the name, Google ID, and team number for the currently authenticated user.',
        tags: [
          'Authenticated Routes',
        ],
        security: [
          {
            GoogleAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'The user team association was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                id: {
                  type: 'string',
                  example: '114979123360880121338',
                  description: 'Google user ID.',
                },
                team: {
                  type: 'string',
                  example: '2022',
                  description: 'FRC team number which the user is a member of.',
                },
                name: {
                  type: 'string',
                  example: 'Dev Singh',
                  description: 'First and last name of the user.',
                },
              },
            },
          },
          400: {
            description: 'The user team association could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
          401: {
            description: 'The current user is not authorized to perform this action.',
            schema: {
              $ref: '#/definitions/NoAuth',
            },
          },
        },
      },
    },
    '/api/fetchUserStrategy': {
      get: {
        summary: "Get user's submitted strategy for a given match and competition",
        description: "Get user's submitted strategy for a given match and competition",
        tags: [
          'Authenticated Routes',
        ],
        security: [
          {
            GoogleAuth: [],
          },
        ],
        parameters: [
          {
            in: 'query',
            name: 'match',
            type: 'string',
            example: '7',
            required: true,
          },
          {
            in: 'query',
            name: 'competition',
            type: 'string',
            example: '2020ilch',
            required: true,
          },
        ],
        responses: {
          200: {
            description: "The user's submitted strategy was retrieved.",
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                data: {
                  type: 'object',
                  example: [{
                    _id: '2020ilchDev Singh7', competition: '2020ilch', data: 'For testing', match: '7', scouter: 'Dev Singh',
                  }],
                  description: 'Array of user submitted strategies for the given match.',
                },
              },
            },
          },
          400: {
            description: 'The user team association could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
          401: {
            description: 'The current user is not authorized to perform this action.',
            schema: {
              $ref: '#/definitions/NoAuth',
            },
          },
        },
      },
    },
    '/api/fetchTeamCompetition': {
      get: {
        summary: 'Get user current competition',
        description: 'Get the competition a user is currently at based on the team association',
        tags: [
          'Authenticated Routes',
        ],
        security: [
          {
            GoogleAuth: [],
          },
        ],
        parameters: [],
        responses: {
          200: {
            description: "The user's competition was retrieved.",
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                team: {
                  type: 'string',
                  example: '2022',
                  description: "User's registered team.",
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                  description: "User's current competition.",
                },
              },
            },
          },
          400: {
            description: 'The user team association could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
          401: {
            description: 'The current user is not authorized to perform this action.',
            schema: {
              $ref: '#/definitions/NoAuth',
            },
          },
        },
      },
    },
    '/api/removeScouterFromMatch': {
      post: {
        summary: 'Remove current user as scouter to a match',
        description: 'Removes the currently signed-in user as a scouter for a given match and team at a given competition.',
        tags: [
          'Authenticated Routes',
        ],
        parameters: [
          {
            in: 'body',
            name: 'match',
            type: 'string',
            example: '2',
            required: true,
          },
          {
            in: 'body',
            name: 'competition',
            type: 'string',
            example: '2020ilch',
            required: true,
          },
          {
            in: 'body',
            name: 'team_scouting',
            type: 'string',
            example: '2022',
            required: true,
          },
        ],
        security: [
          {
            GoogleAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'The user was removed as a scouter to the match.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
              },
            },
          },
          400: {
            description: 'The user was not removed as a scouter to the match. Returns the reasons for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
          401: {
            description: 'The current user is not authorized to perform this action.',
            schema: {
              $ref: '#/definitions/NoAuth',
            },
          },
          403: {
            description: 'Key-based authentication is not allowed for this route',
            schema: {
              $ref: '#/definitions/KeysNotAllowed',
            },
          },
        },
      },
    },
    '/api/submitMatchData': {
      post: {
        summary: 'Submit scouted data',
        description: 'Stores the scouted match data for a given match and team.',
        tags: [
          'Authenticated Routes',
        ],
        parameters: [
          {
            in: 'body',
            name: 'match',
            required: true,
            type: 'string',
            example: '2',
          },
          {
            in: 'body',
            name: 'teamScouted',
            required: true,
            type: 'string',
            example: '2022',
          },
          {
            in: 'body',
            name: 'competition',
            required: true,
            type: 'string',
            example: '2020ilch',
          },
          {
            in: 'body',
            name: 'data',
            type: 'object',
            required: true,
            example: {
              'balls-started': 3,
              'balls-collected': 0,
              climb: 'No attempt',
              speed: 'Slow',
            },
            description: 'Match data of arbitrary JSON structure to store.',
          },
        ],
        security: [
          {
            GoogleAuth: [],
          },
          {
            CLIENT_ID: [],
            CLIENT_SECRET: [],
          },
        ],
        responses: {
          200: {
            description: 'The data was submitted. Returns the comeptition and match that was scouted.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
                match: {
                  type: 'number',
                  example: 2,
                },
              },
            },
          },
          400: {
            description: 'The data was not submitted. Returns the reasons for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
          401: {
            description: 'The current user is not authorized to perform this action.',
            schema: {
              $ref: '#/definitions/NoAuth',
            },
          },
        },
      },
    },
    '/api/fetchAllTeamMatchData': {
      get: {
        summary: 'Gets all the team match data',
        description: 'Returns all of the team match data',
        tags: [
          'Non-Authenticated Routes',
        ],
        responses: {
          200: {
            description: 'All team match data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
              },
            },
          },
          400: {
            description: 'All team match data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchAllTeamPitData': {
      get: {
        summary: 'Gets all the team pit data',
        description: 'Returns all of the team pit data',
        tags: [
          'Non-Authenticated Routes',
        ],
        responses: {
          200: {
            description: 'All team pit data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
              },
            },
          },
          400: {
            description: 'All team pit data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchMetricsData': {
      get: {
        summary: 'Get the metrics data for the team',
        description: 'Returns the metrics data for the team',
        tags: [
          'Non-Authenticated Routes',
        ],
        responses: {
          200: {
            description: 'The team metrics data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
                team: {
                  type: 'string',
                  example: '2022',
                  description: 'FRC team number which the user is a member of.',
                },
              },
            },
          },
          400: {
            description: 'The team metrics data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchPitVariableData': {
      get: {
        summary: 'Gets the data for the pit variables',
        description: 'Returns the data for the pit variables',
        tags: [
          'Non-Authenticated Routes',
        ],
        responses: {
          200: {
            description: 'The pit variable data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
              },
            },
          },
          400: {
            description: 'The pit variable data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchAnalysisFlags': {
      get: {
        summary: 'Gets the data for the flag',
        description: 'Returns the data for the flag',
        tags: [
          'Non-Authenticated Routes',
        ],
        responses: {
          200: {
            description: 'The flag data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                flag: {
                  type: 'string',
                  example: 'latest_update',
                },
              },
            },
          },
          400: {
            description: 'The flag data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchMatchConfig': {
      get: {
        summary: 'Fetches the match scouting config for a given team and competition\n',
        description: 'Fetches the match scouting config for a given team and competition\n',
        tags: [
          'Authenticated Routes',
        ],
        parameters: [
          {
            in: 'query',
            name: 'competition',
            required: true,
            type: 'string',
            example: '2020ilch',
          },
        ],
        responses: {
          200: {
            description: 'The match config data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
                team: {
                  type: 'string',
                  example: '2022',
                },
                config: {
                  type: 'object',
                  example: [{
                    Auto: [{
                      name: 'Passed Auto Line?', key: 'pass-line', widget: 'segment', options: ["Don't Know", 'No', 'Yes'],
                    }, { name: 'Initial Balls Stored', key: 'balls-started', widget: 'stepper' }, { name: 'Extra Balls Collected', key: 'balls-collected', widget: 'stepper' }, { name: 'Balls Scored Upper', key: 'balls-upper-auto', widget: 'stepper' }, { name: 'Balls Scored Lower', key: 'balls-lower-auto', widget: 'stepper' }],
                  }, {
                    Teleop: [{
                      name: 'Spun Wheel?', key: 'spun-wheel', widget: 'segment', options: ["Don't know", 'No', 'Position', 'Color'],
                    }, { name: 'Balls Scored Upper', key: 'balls-upper-teleop', widget: 'stepper' }, { name: 'Balls Scored Lower', key: 'balls-lower-teleop', widget: 'stepper' }, {
                      name: 'Did they shoot from a vulnerable location??', key: 'shooting-vulnerable', widget: 'segment', options: ["Don't know", 'No', 'Yes'],
                    }, { name: 'Where could they shoot from?', key: 'shooting-notes', widget: 'text-area' }, {
                      name: 'Did they climb?', key: 'climb', widget: 'segment', options: ["Don't know", 'No Attempt', 'Failed', 'Yes'],
                    }, {
                      name: 'Did they play defense?', key: 'defense', widget: 'segment', options: ["Don't know", 'No', 'Yes'],
                    }, { name: 'What teams did this one play defense on?', key: 'defense-notes', widget: 'text-area' }],
                  }, {
                    Notes: [{
                      name: 'Overall Competency', key: 'competency', widget: 'segment', options: ["Don't know", 'Awful', 'Meh', 'Good', 'Best'],
                    }, {
                      name: 'Speed', key: 'speed', widget: 'segment', options: ["Don't know", 'Slow', 'Med.', 'Fast', 'Ludicrous'],
                    }, {
                      name: 'Strategic Focus', key: 'strategic-focus', widget: 'segment', options: ["Don't know", 'Offense', 'Defense', 'Hybrid'],
                    }, { name: 'How could we use this robot in a strategy?', key: 'strategy-notes', widget: 'text-area' }],
                  }],
                },
              },
            },
          },
          400: {
            description: 'The match config data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchAllTeamNicknamesAtCompetition': {
      get: {
        summary: 'Fetches the nicknames for all teams at a competition\n',
        description: 'Fetches the nicknames for all teams at a competition\n',
        tags: [
          'Non-Authenticated Routes',
        ],
        parameters: [
          {
            in: 'query',
            name: 'competition',
            required: true,
            type: 'string',
            example: '2020ilch',
          },
        ],
        responses: {
          200: {
            description: 'The nickname data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                  description: 'User-provided competition.',
                },
                data: {
                  type: 'object',
                  example: {
                    63: 'McDowell Robotics Team 63', 101: 'Striker', 111: 'WildStang', 930: 'Mukwonago BEARs', 1625: 'Winnovation', 1675: 'UPS (Ultimate Protection Squad)', 1732: 'Hilltoppers', 1739: 'Chicago Knights', 1756: 'Argos', 1781: 'Lindblom Electric Eagles', 2022: 'Titan Robotics', 2039: 'Rockford Robotics', 2136: 'Impossible Mission Force', 2151: 'Monty Pythons', 2338: 'Gear It Forward', 2358: 'Bearbotics', 2451: 'PWNAGE', 2725: 'Ice Princesses', 3061: 'Huskie Robotics', 3067: 'Robovikes', 3110: 'SeaBots', 3197: 'HexHounds', 3352: 'Flaming Monkeys 4-H Robotics Club', 3410: 'Miami MEngs', 3488: 'Eagle Army', 3734: 'Caxys', 4096: 'Ctrl-Z', 4191: 'IMC', 4241: 'Joliet Cyborgs ', 4292: 'PorterBots', 4296: 'Trident Robotics', 4645: 'The Chicago Style BotDogs', 4702: 'CyberDoggz', 4787: 'Axiom', 5125: 'Hawks on the Horizon', 5133: 'PrepaTec - Blue Steel', 5148: 'New Berlin Blitz', 5350: 'Hope Robotics', 5822: 'WolfByte', 5847: 'Ironclad', 5934: 'Crowbotics', 6237: 'Martin Motion', 6381: 'Red Raider Robotics', 6906: 'Reybots', 7237: 'UniBots', 7411: 'CrossThreaded', 7560: 'Doodle Bots', 7608: 'Owlenators', 8014: 'Fortitude Robotics', 8029: 'Mustang Mafia', 8096: 'Cache Money', 8122: 'Robotic Eagles ', 8160: 'Oly Rock Stars', 8184: 'ROBOTTACK', _id: '5e5e7b43705c112b54434809', competition: '2020ilch',
                  },
                },
              },
            },
          },
          400: {
            description: 'The match config data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchCompetitionSchedule': {
      get: {
        summary: 'Fetches the competiton schedule for a given competition\n',
        description: 'Fetches the competiton schedule for a given competition. Also provides scouting seat availability and filling.\n',
        tags: [
          'Non-Authenticated Routes',
        ],
        parameters: [
          {
            in: 'query',
            name: 'competition',
            required: true,
            type: 'string',
            example: '2020ilch',
          },
        ],
        responses: {
          200: {
            description: 'The competition schedule data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },

                data: {
                  type: 'object',
                  example: [{
                    _id: '5e61b638a3dfe2b512d4ff3e', teams: ['8184', '1675', '3197', '7237', '4787', '5125'], scouters: [{ name: 'Sarah Oquendo', id: '116902796378120080000' }, { name: 'Cordelia Sirais', id: '104097601226614030000' }, { name: 'Alexander Wells', id: '113332350115233820000' }, { name: 'Liam Nelson', id: '105420177494902540000' }, { name: 'Dev Singh', id: '114979123360880120000' }, { name: 'Jacob Levine', id: '118006453012298350000' }], match: 16, competition: '2020ilch',
                  }],
                },
              },
            },
          },
          400: {
            description: 'The match config data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchCompetitionFriendlyName': {
      get: {
        summary: 'Fetches the friendly name for a competition identifier\n',
        description: 'Fetches the friendly name for a competition identifier\n',
        tags: [
          'Non-Authenticated Routes',
        ],
        parameters: [
          {
            in: 'query',
            name: 'competition',
            required: true,
            type: 'string',
            example: '2020ilch',
          },
        ],
        responses: {
          200: {
            description: 'The friendly name data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                  description: 'User-provided competition.',
                },
                data: {
                  type: 'object',
                  example: { friendlyName: '2020 Midwest Regional' },
                },
              },
            },
          },
          400: {
            description: 'The friendly name data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
    '/api/fetchTeamTestsData': {
      get: {
        summary: 'Fetches the team analysis data for a given competition and team (Team 2022 only)\n',
        description: 'Fetches the team analysis data for a given competition and team (Team 2022 only)\n',
        tags: [
          'Authenticated Routes',
        ],
        parameters: [
          {
            in: 'query',
            name: 'competition',
            required: true,
            type: 'string',
            example: '2020ilch',
          },
          {
            in: 'query',
            name: 'team',
            required: true,
            type: 'string',
            example: '2022',
          },
        ],
        responses: {
          200: {
            description: 'The analysis data was retrieved.',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                  description: 'Describes whether the request completed successfully.',
                },
                competition: {
                  type: 'string',
                  example: '2020ilch',
                },
                team: {
                  type: 'string',
                  example: '2022',
                },
                data: {
                  type: 'object',
                },
              },
            },
          },
          400: {
            description: 'The match config data could not be retrieved. Returns the reason for the error.',
            schema: {
              $ref: '#/definitions/NoData',
            },
          },
        },
      },
    },
  },
}
