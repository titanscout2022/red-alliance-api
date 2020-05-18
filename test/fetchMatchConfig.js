process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index.js');

const should = chai.should();

chai.use(chaiHttp);
/*
  * Test the /GET route
  */
describe('/GET /fetchMatchConfig', () => {
  it('it should GET the match scout config', (done) => {
    chai.request(server)
      .get('/api/fetchMatchConfig')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
