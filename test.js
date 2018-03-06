let request = require('request');

request({
	url: 'http://localhost:3000/config',
	method: 'POST',
	headers: {Accept: 'application/json'},
	body: `{"url": "/test", "mockConfig": {
  "object|2-4": {
    "110000": "北京市",
    "120000": "天津市",
    "130000": "河北省",
    "140000": "山西省"
  }
}}`

}, (req, res, body) => {
	console.log(body);
	
})


request({
	url: 'http://localhost:3000/config',
	method: 'POST',
	headers: {Accept: 'application/json'},
	body: `{"url": "/list", "mockConfig": {
  "array|1-10": ["Hello","Mock.js","!"]
}
}`

}, (req, res, body) => {
	console.log(body);
	
})

setTimeout(() => {
request('http://localhost:3000/test', (req, res, body) => {
		console.log(res.body)
	})

request('http://localhost:3000/list', (req, res, body) => {
		console.log(res.body)
	})
}, 3000)