'use strict';

const co = require('co');
const expect = require('chai').expect;
const when = require('../steps/when');
const init = require('../steps/init').init;
const cheerio = require('cheerio');

describe(`When we invoke the GET / endpoint`, co.wrap(function* () {
    this.timeout(8000);

  console.log('before' + '-----' + 'init');
  before(co.wrap(function* () {
    yield init();
    console.log('init' + '-----' + 'done');
  }));

  it(`Should return the index page with 8 restaurants`, co.wrap(function* () {
    console.log('before' + '-----' + 'invoke');

    let res = yield when.we_invoke_get_index();

    console.log('res' + '-----' + res);

    expect(res.statusCode).to.equal(200);
    expect(res.headers['content-type']).to.equal('text/html; charset=UTF-8');
    expect(res.body).to.not.be.null;

    let $ = cheerio.load(res.body);
    let restaurants = $('.restaurant', '#restaurantsUl');
    expect(restaurants.length).to.equal(8);
    
  }));
  
}));