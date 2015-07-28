var express = require('express');
var router = express.Router();
var Redis = require('ioredis');
var fs = require('fs');

var redis = new Redis({
			  sentinels: [{ host: 'localhost', port: 26379 }],
			  name: 'mymaster'
			}),
	readOptions = {
		encoding: 'utf8'
	};

/* GET home page. */
router.get('/', function(req, res, next) {

	// read JSON from file
	fs.readFile('public/json/data.json', 'utf8', function (err, data) {

		if (err) res.send('AHMAGERRRD');

		redis.hmset('rc:bnef201507281524', JSON.parse(data));

		redis.hgetall('rc:bnef201507281524', function (err, result) {
    		res.send(result);
		});
	});
});

module.exports = router;
