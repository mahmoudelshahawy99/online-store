const jwt = require('express-jwt');
const { secret } = require('../config.json');
const db = require('../services/db');

function authorize() {
    return [

        jwt({ secret, algorithms: ['HS256'] }),
        
        async (req, res, next) => {
            const trader = await db.Trader.findByPk(req.user.id);
            if (!trader) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        }
    ];
}

module.exports = authorize;