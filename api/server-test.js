const app = require('./server.js')
const request = require('supertest')
var mongoose = require('mongoose')
var mongoDB = "mongodb://127.0.0.1/test_db"
mongoose.connect(mongoDB)

describe('App test', ()=> {
    it('has a module', ()=> {
        expect(app).toBeDefined()
    })
    let server;

    beforeAll(()=> {
        server = app.listen(3001)
    })

    afterAll(done=> {
        mongoose.connection.close()
        server.close(done)
    })
})

describe('user routes test', ()=> {
    it('can list stylists', async () => {
        await request(server).get('api/stylsits/').expect(200)
    })

    it('can post stylists', async () => {
        await request(server).get('api/stylsits/').expect(200)
    })

    it('fails if _email_ is missing', async () => {
        await request(server).post('auth/register/stylsits/').expect(500)
    })
})

describe('404 for unknown api', ()=> {
    it ('returns status 404', ()=> {
        await request(server).post('/not-an-api').expect(404)
    })
})



