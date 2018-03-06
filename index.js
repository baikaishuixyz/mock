let connect = require('connect');
let http = require('http');
let mock = require('mockjs');

let mockConfigs = {};

let app = connect();

app.use('/config', (req, res, next) => {
	req.on('data', s => {
		let config = JSON.parse(s.toString())
		mockConfigs[config.url] = config.mockConfig;
		configMock(config.url);
	})
	res.end('ok')
});


function configMock(url) {
	app.use(url, (req, res, next) => {
		let data = mock.mock(mockConfigs[url]);
		res.end(JSON.stringify(data));
	})
}


http.createServer(app).listen(3000);