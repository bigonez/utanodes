// configure the CORS options

export default {
    origin: [
        "https://utaplanner.vercel.app",
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:5173",
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
