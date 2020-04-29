const app = require('./server.js')
const request = require('supertest')
var mongoose = require('mongoose')
var mongoDB = "mongodb://127.0.0.1/test_db"
mongoose.connect(mongoDB)

let server;

beforeAll(()=> {
    server = app.listen(3001)
})

afterAll(done=> {
    mongoose.connection.close()
    server.close(done)
})


test('App has a module', ()=> {
    expect(app).toBeDefined()
})

test('can list stylists', async () => {
    await request(app).get('api/stylsits/').expect(200)
})

test('can post stylists', async () => {
    const stylist = {first_name: 'Foo', last_name: 'Foo', email: 'Foo', password: 'Foo'}
    await request(app).post('api/stylsits/', stylist).expect(200)
})

test('fails if _email_ is missing', async () => {
    await request(app).post('auth/register/stylsits/').expect(500)
})

test('404 for unknown api', async ()=> {
    await request(app).get('/not-an-api').expect(404)
})



