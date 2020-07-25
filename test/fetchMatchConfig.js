process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/index.ts');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-json'));

/*
  * Test the /GET route
  */
 function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

describe('/GET /fetchMatchConfig', () => {
  it('it should GET the match scout config', (done) => {
    chai.request(server)
      .get('/api/fetchMatchConfig')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('array');
        // make sure that each screen has a valid config
        for (const screenConfig of res.body) {
          expect(isJson(JSON.stringify(screenConfig))).to.eql(true);
        }
        done();
      });
  });
});
