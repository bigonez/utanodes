const appRoot = (req, res) => {
	res.json({
		"Title": 'Nodes API for UTA100 Planner',
		"Usage": 'https://utanodes.vercel.app/nodes?finishtime=[expected finish time]&reference=[dataset size]',
		"Example":'https://utanodes.vercel.app/nodes?finishtime=20&reference=100'
	});
};

const appAbout = (req, res) => {
	res.json({
		"About": "Nodes API for UTA100 Planner",
		"Environment": process.env.NODE_ENV,
		"Service Port": process.env.UTANODES_APP_PORT,
		"Working Path": process.cwd(),
		"Database": process.cwd() + process.env.UTANODES_APP_DB,
	});
};

export {
    appRoot,
    appAbout
};
