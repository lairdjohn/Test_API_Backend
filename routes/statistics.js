// Modules required
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const axios = require("axios").default; // Needed for external API call
const model = require('../models/stats');

// Prefixed route
const router = Router({prefix: '/myAPI/v1'});

// Endpoints
// router.get('/stats', displayStats);
router.get('/stats', bodyParser(), getCODStats);
router.get('/stats/myProfile/:id([0-9]{1,})', getMyStats)


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
    // Get username and platform that will be needed for request
    var username = ctx.request.body.username;
    var platform = ctx.request.body.platform;
    // Store HTTP Get to API with url and headers required to make call
    var options = {
        method: 'GET',
        url: `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${username}/${platform}`,
        headers: {
            'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com',
            'x-rapidapi-key': 'd08f4aa168msh70aa02d0584b683p1ac8bcjsnaa334409768f'
        }
    };
    
    // Try to make request with all options specified above and store/display data to user
    try{
        await axios.request(options).then(function (response) {
            ctx.status = 200
            ctx.body = response.data
            // Key Values we want to store for user from request
            if(ctx.params.id){
                let values = {ID: ctx.params.id, wins: response.data.br.wins, kills: response.data.br.kills,
                    kd: response.data.br.kdRatio, kpm: response.data.br.kills / response.data.br.gamesPlayed,
                    userID: parseInt(ctx.params.id)}
                saveData(values)
            } else {
                console.log("No Data")
            }
        })
    // If there was an error in the request display simple error message
    } catch(error){
        ctx.status = 404
        ctx.body = "Unable to perform action"
        console.log(error)
    }
}

// Function stores data from API call into local DB for users profile
async function saveData(data){
    try{
        await model.saveRecentStats(data)
    } catch(error){
        throw error
    }
}

async function getMyStats(ctx){
    let id = ctx.params.id
    try{
        let stats = await model.myStats(id)
        console.log(stats)
        if(stats.length !== 0){
            ctx.body = stats
        }else{
            ctx.body = {Error: 'No Data'}
        }
    } catch(error){
        throw error
    }
}
module.exports = router;