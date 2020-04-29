var mongoose = require('mongoose')
var mongoDB = "mongodb://127.0.0.1/test_db"
var Stylist = require('./stylists-model')
const app = require('../api/server.js')
var sinon = require('sinon')
mongoose.connect(mongoDB)

// const expect = require('chai').expect;
// const request = require('supertest')
// const app = require('../index')
beforeAll(async ()=> {
    await Stylist.remove({})
});

afterEach(async ()=> {
    await Stylist.remove({})
});

afterAll(async()=> {
    await mongoose.connection.close()
});

test('Stylist model has a module', () => {
    expect(Stylist).toBeDefined();
})

test('create a stylsit', async ()=> {
    const stylist = {first_name: 'Foo', last_name: 'Foo', email: 'Foo', password: 'Foo', usertype: 'stylist'}
    await Stylist.addStylist(stylist)

    const foundStylist = await Stylist.findStylistBy({email: 'Foo'})
    expect(foundStylist.name).toEqual('Foo')
})

test('get stylist by email',  async ()=> {
    const stylist = {first_name: 'Foo', last_name: 'Foo', email: 'Foo2', password: 'Foo2', usertype: 'stylist'}
    await Stylist.addStylist(stylist)

    const foundStylist = await Stylist.findStylistBy({email: 'Foo2'})
    expect(foundStylist.name).toEqual('Foo')
})

test('update stylist name', async () => {
    const stylist = {first_name: 'Foo', last_name: 'Foo', email: 'Foo3', password: 'Foo3', usertype: 'stylist'}
    await Stylist.addStylist(stylist)

    stylist.name = 'Faa'
    const updatedStylist = await Stylist.post(stylist)

    const foundStylist = await Stylist.findStylistBy({email: 'Foo3'})
    expect(foundStylist.name).toEqual(updatedStylist.name)
})

test('returns list of stylists', async ()=> {
    const MockModel = {
        find: sinon.spy()
    }

    const service = app(MockModel)
    service.listStylists()
    // service.use('api/stylists/')
    expect(MockModel.find.calledOnce).toEqual(true);
})


 


