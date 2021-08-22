// Modules requires
const Router = require('koa-router');
const model = require('../models/dummyData')

// Prefixed route
const router = Router({prefix: '/myAPI/v1'});

// Route
router.get('/dummy', dummyData);

// Function gets all dummy data from the database and displays it to the user 
async function dummyData(ctx){
    let data = await model.allDummyData();
    console.log(data)
    try{
        ctx.body = {Message: "All dummy data", Data: data};
        ctx.status = 200;
    } catch (error) {
        ctx.body = {Message: "Oops... Something went wrong!"}
        ctx.status = 404;
    }
}

module.exports = router;