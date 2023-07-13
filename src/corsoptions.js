// configure the CORS options

module.exports = {
	origin: [
		"https://utaplanner.vercel.app",
		"http://localhost",
		"http://localhost:8080",
	],
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
