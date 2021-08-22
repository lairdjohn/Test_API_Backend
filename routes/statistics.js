// Modules required
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
var axios = require("axios").default; // Needed for external API call

// Prefixed route
const router = Router({prefix: '/myAPI/v1'});

// Endpoints
router.get('/stats', displayStats);
router.get('/stats/COD', getCODStats);


function displayStats(ctx){
    const stats = {
        "KD": 4.27,
        "KPM": 9,
        "Wins": 535,
        "Kills": 30000,
        "Deaths": 7000
    }
    ctx.body = stats
    console.log(ctx.body)
}

// Function gets Call of Duty stats of player from external API found at:
// https://rapidapi.com/elreco/api/call-of-duty-modern-warfare

async function getCODStats(ctx){
    var options = {
        method: 'GET',
        url: 'https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/VanQ%20John/xbl',
        headers: {
            'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com',
            'x-rapidapi-key': 'd08f4aa168msh70aa02d0584b683p1ac8bcjsnaa334409768f'
        }
    };
    
    try{
        await axios.request(options).then(function (response) {
            console.log(response.data)
            ctx.status = 200
            ctx.body = response.data
        })
    } catch(error){
        ctx.status = 404
        ctx.body = "Unable to perform action"
        console.log(error)
    }
}


module.exports = router;