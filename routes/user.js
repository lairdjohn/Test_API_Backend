const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/user')
const {validateUser} = require('../controllers/schemaValidation')
const bcrypt = require('bcrypt')

const router = Router({prefix: '/myAPI/v1'})

router.post('/createAccount', bodyParser(), validateUser, createAccount)


// Create user into db
async function createAccount(ctx){
    let body = ctx.request.body;
    const hash = bcrypt.hashSync(body.password, 10);  // Based upon https://www.npmjs.com/package/bcrypt
    body.password = hash;
    try{
        let user = await model.createAccount(body)
        if(user){
            ctx.body = {Message: 'Account Created!'}
            ctx.status = 200;
        }else{
            ctx.body = {Message: 'Account Exists'}
            ctx.status = 404
        }
    } catch(error){
        throw error;
    }
}

module.exports = router;