const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Reviews API', () => {
  it('should return reviews by product ID, sort method and review count', async () => {
    chai.request('http://localhost:3000')
      .get('/reviews')
      .query({ product_id: '3711', sort: 'helpful', count: '10' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(response.body.length).to.equal(10);
        expect(response.body[0].photos).to.equal(array);
      });
  });
});

describe('getMeta API', () => {
  it('returns metadata for a product with valid product_id', async () => {
    chai.request('http://localhost:3000')
      .get("/reviews/meta")
      .query({ product_id: '3711' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
      })
  });
});
