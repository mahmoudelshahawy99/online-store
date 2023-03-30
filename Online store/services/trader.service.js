const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const sendEmail = require('../services/send-email');
const db = require('../services/db');

module.exports = {
    register,
    verifyEmail,
    authenticate,
};

async function register(params) {
    const trader = new db.Trader(params);
    trader.verificationToken = randomTokenString();
    trader.password = await hash(params.password);
    await trader.save();
    await sendVerificationEmail(trader);
}

async function verifyEmail({ token }) {
    const trader = await db.Trader.findOne({ where: { verificationToken: token } });
    if (!trader) throw 'Verification failed';
    trader.verified = Date.now();
    trader.verificationToken = null;
    await trader.save();
}

async function hash(password) {
    return await bcrypt.hash(password, 10);
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

async function sendVerificationEmail(trader) {
    let message = `<p>Please use the below token to verify your email address with the <code>api/v1/verify-email</code> api route:</p>
                   <p><code>${trader.verificationToken}</code></p>`;

    await sendEmail({
        to: trader.email,
        subject: 'Signup Verification Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    });
}

async function authenticate({ email, password }) {
    const trader = await db.Trader.scope('withHash').findOne({ where: { email } });
    
    if (!trader || !trader.isVerified || !(await bcrypt.compare(password, trader.password))) {
        throw 'Email or password is incorrect';
    }
    const jwtToken = generateJwtToken(trader);
    return {
        ...basicDetails(trader),
        jwtToken
    };
}

function generateJwtToken(trader) {
    return jwt.sign({ sub: trader.id, id: trader.id }, config.secret, { expiresIn: '120m' });
}

function basicDetails(trader) {
    const { id, firstName, lastName, email, role, created, updated, isVerified } = trader;
    return { id, firstName, lastName, email, role, created, updated, isVerified };
}
