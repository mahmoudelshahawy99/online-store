require('rootpath')();
const express = require('express');
const cron = require("node-cron");
const sendEmail = require('./services/send-email');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./util/error-handler');
const traderRoute = require('./route/trader.route');
const productRoute = require('./route/product.route');
const clientRoute = require('./route/client.route');
const orderRoute = require('./route/order.route');
const db = require('./services/db');
const clientService = require('./services/client.service');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use("/api/v1", traderRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", clientRoute);
app.use("/api/v1", orderRoute);

app.use(errorHandler);


async function getClients() {
    return await db.Client.findAll({attributes: ['id', 'email']});
}

cron.schedule("0 10 28-31 * *", function () {
    console.log("running a notification mail at the end of every month");
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (today.getMonth() !== tomorrow.getMonth()) {
        getClients().then((res)=>{
            let message = `<p>New offers for you</p>`;
            const clients = res.map(x => clientService.basicDetails(x));
            clients.forEach((row) => {
            sendEmail({
                to: row.email,
                subject: 'Notification offer mail',
                html: `<h4>New offers</h4>
                       <p>Thanks for being with us!</p>
                       ${message}`
                });
            }); 
        });
    }
});

// start server
app.listen(3000, () => {
    console.log("Server started ..........");
})
