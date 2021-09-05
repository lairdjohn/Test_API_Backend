// Modules required
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// Routes
const stats = require('./routes/statistics');
const dummy = require('./routes/dummyData');
const user = require('./routes/user');


port = 4000;
app.use(router.routes());
app.use(stats.routes());
app.use(dummy.routes());
app.use(user.routes())

app.listen(port)
console.log("Now listening on Port: ", port);

