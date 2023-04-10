const chai = require('chai');
const chaiHttp = require('chai-http');
const models = require('../models/postgres/index.js')
chai.use(chaiHttp);
const expect = chai.expect;

var body = {
  product_id: 3745,
  rating: 5,
  summary: 'knvjfkvns',
  body: 'cjndkasxnal',
  recommend: true,
  name: 'knvjfkvns',
  email: 'mncdsncd@gmail.com',
  photos: [],
  characteristics: { '12511': 4, '12512': 2, '12513': 2, '12514': 4 }
}
var date = new Date().getTime();


describe('DBMS Testing', () => {
  describe('getReviews', () => {
    it('should return results in under 50ms', async () => {
      const startTime = Date.now();
      const results = await models.getReviews(3711, 1, 5, 'helpful');
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).to.be.lessThan(50);
      console.log(`Query time: ${elapsedTime}ms`);
    });
  });
});

describe('DBMS Testing', () => {
  describe('getReviewsmeta', () => {
    it('should return results in under 50ms', async () => {
      const startTime = Date.now();
      const results = await models.getReviewsMeta(3711);
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).to.be.lessThan(50);
      console.log(`Query time: ${elapsedTime}ms`);
    });
  });
});

describe('DBMS Testing', () => {
  describe('update helpful', () => {
    it('should return results in under 50ms', async () => {
      const startTime = Date.now();
      const results = await models.updateReviewHelpful(3711);
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).to.be.lessThan(50);
      console.log(`Query time: ${elapsedTime}ms`);
    });
  });
});

describe('DBMS Testing', () => {
  describe('report', () => {
    it('should return results in under 50ms', async () => {
      const startTime = Date.now();
      const results = await models.reportReview(3711);
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).to.be.lessThan(50);
      console.log(`Query time: ${elapsedTime}ms`);
    });
  });
});

describe('DBMS Testing', () => {
  describe('post', () => {
    it('should return results in under 50ms', async () => {
      const startTime = Date.now();
      const results = await models.postForm(body,date);
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).to.be.lessThan(50);
      console.log(`Query time: ${elapsedTime}ms`);
    });
  });
});

// describe('Reviews API', () => {
//   it('should return reviews by product ID, sort method and review count', (done) => {
//     chai.request('http://localhost:3000')
//       .get('/reviews')
//       .query({ product_id: '3711', sort: 'helpful', count: '10' })
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.an('array');
//         expect(res.body.length).to.equal(10);
//         expect(res.body[0].photos).to.be.an('array');
//         expect(res.body[0]).to.have.property('review_id');
//         expect(res.body[0]).to.have.property('rating');
//         expect(res.body[0]).to.have.property('summary');
//         expect(res.body[0]).to.have.property('recommend');
//         expect(res.body[0]).to.have.property('response');
//         expect(res.body[0]).to.have.property('body');
//         expect(res.body[0]).to.have.property('date');
//         expect(res.body[0]).to.have.property('reviewer_name');
//         expect(res.body[0]).to.have.property('helpfulness');
//         expect(res.body[0]).to.have.property('photos');
//         done();
//       });
//   });
// });

// describe('getReviews function', () => {
//   it('should return reviews for a product', async (done) => {
//     const params = {
//       product_id: 3711,
//       page: 1,
//       count: 5,
//       sort: 'helpful'
//     };
//     models.getReviews(params, (err, reviews) => {
//       expect(err).to.be.null;
//       expect(reviews).to.be.an('array');
//       expect(reviews.length).to.equal(5); // assuming count is set to 5
//       expect(reviews[0]).to.have.property('review_id');
//       expect(reviews[0]).to.have.property('rating');
//       expect(reviews[0]).to.have.property('summary');
//       expect(reviews[0]).to.have.property('recommend');
//       expect(reviews[0]).to.have.property('response');
//       expect(reviews[0]).to.have.property('body');
//       expect(reviews[0]).to.have.property('date');
//       expect(reviews[0]).to.have.property('reviewer_name');
//       expect(reviews[0]).to.have.property('helpfulness');
//       expect(reviews[0]).to.have.property('photos');
//       done();
//     });
//   });
// });

// describe('getMeta API', () => {
//   it('returns metadata for a product with valid product_id', async () => {
//     chai.request('http://localhost:3000')
//       .get("/reviews/meta")
//       .query({ product_id: '3711' })
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.an('array');
//         done();
//       })
//   });
// });
