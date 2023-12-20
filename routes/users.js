var express = require('express');
var router = express.Router();
var allController = require("../controller/allcontroller")
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store, {
    freeRetries: 500
});
const failCallback = (req, res, next, nextValidRequestDate) => {
  return res.status(429).json({ status: 429, 
      message:'Too many requests in this time frame.',
      nextValidRequestDate: nextValidRequestDate,
  });
};
let bruteforcePrevent = new ExpressBrute(store, {
  freeRetries: Number(process.env.BRUTEFORCE_RETRIES) || 5,
  minWait: Number(process.env.BRUTEFORCE_MINWAIT) || 2 * 60 * 1000, // Minimum time (in milliseconds) between requests
  maxWait: Number(process.env.BRUTEFORCE_MAXWAIT) || 2 * 60 * 1000, // Maximum time (in milliseconds) between requests
  lifetime: Number(process.env.BRUTEFORCE_MAXWAIT) || 2 * 60 * 1000,
  refreshTimeoutOnRequest: false,
  attachResetToRequest:true,
  failCallback:failCallback,
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/sendEmail',bruteforcePrevent.prevent,allController.nodemailerController.sendOtpTNSSite);

module.exports = router;
