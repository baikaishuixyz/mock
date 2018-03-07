let connect = require('connect');
let http = require('http');
let mock = require('mockjs');

let mockConfigs = {};

let app = connect();

app.use('/config', (req, res, next) => {
	req.on('data', s => {
		console.log(JSON.parse(s.toString()))
		let config = '';
		try{
			config = JSON.parse(s.toString())
		}catch(e) {
			res.end(JSON.stringify(e));
			return;
		}
		mockConfigs[config.url] = config.mockConfig;
		configMock(config.url);
		res.end('ok')
	})
});

function configMock(url) {
	app.use(url, (req, res, next) => {
		let data = mock.mock(mockConfigs[url]);
		res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
		res.end(JSON.stringify(data));
	})
}

http.createServer(app).listen(80);