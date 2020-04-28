var mongoose = require('mongoose')
// create a test db:
var mongoDB = "mongodb://127.0.0.1/test_db"
mongoose.connect(mongoDB)
const Stylist = require('./stylists-model')

// const expect = require('chai').expect;
// const request = require('supertest')
// const app = require('../index')

describe('Stylist model test', ()=> {
    beforeAll(async ()=> {
        await Stylist.remove({})
    });

    afterEach(async ()=> {
        await Stylist.remove({})
    });

    afterAll(async()=> {
        await mongoose.connection.close()
    });

    it('has a module', () => {
        expect(Stylist).toBeDefined();
    })
})

describe('create a stylsit', ()=> {
    it('adds new stylist to db', async ()=> {
        const stylist = new Stylist({name: 'Foo', email: 'Foo', password: 'Foo'})
        await stylist.save()

        const foundStylist = await Stylist.findStylistBy({email: 'Foo'})
        expect(foundStylist.name).toEqual('Foo')
    })
})

describe('get stylsit', ()=> {
    it('gets a stylist by name', async ()=> {
        const stylist = new Stylist({name: 'Foo', email: 'Foo', password: 'Foo'})
        await stylist.save()

        const foundStylist = await Stylist.findStylistBy({email: 'Foo'})
        expect(foundStylist.name).toEqual('Foo')
    })
})

describe('update stylist', ()=> {
    it('changes stylist name', async ()=> {
        const stylist = new Stylist({name: 'Foo', email: 'Foo', password: 'Foo'})
        await stylist.save()

        stylist.name = 'Faa'
        const updateStylist = await stylist.save()

        const foundStylist = await Stylist.findStylistBy({email: 'Foo'})
        expect(foundStylist.name).toEqual('Faa')
    })
})

describe('returns list of stylists', ()=> {
    it('returns all stylists', async ()=> {
        const MockModel = {
            find: sinon.spy()
        }

        const searchService = Stylist(MockModel)
        searchService.listStylists()
        expect(MockModel.find.calledOnce).toEqual(true);
    })
})



// CHAI TEST:
// describe('POST /posts', ()=> {
    // before((done)=> {
    //     db.connect()
    //     .then(()=> done())
    //     .catch(err=> done(err))
    // }) 

    // after((done)=> {
    //     db.close()
    //     .then(()=>done())
    //     .catch(err=> done(err))
    // })

//     it('Api for creating a new post works', (done)=> {
//         request(app).post('/posts')
//         // request(db).post({stylist_id: 1, comment: 'Hello'})
//         .send({stylist_id: 1, comment: 'Hello'})
//         .then(res=> {
//             const body = res.body
//             expect(body).to.contain.property('stylist_id')
//             expect(body).to.contain.property('comment')
//             done()
//         })
//         .catch(err => done(err) )
//     })

// })  


