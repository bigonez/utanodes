const appRoot = (req, res) => {
    res.json({
        "Title": 'Nodes API for UTA Planner',
        "Usage": 'https://utanodes.vercel.app/nodes?event=[race]&finishtime=[expected finish time]&reference=[dataset size]',
        "Example":'https://utanodes.vercel.app/nodes?event=1&finishtime=20&reference=100'
    });
};

const appAbout = (req, res) => {
    res.json({
        "About": "Nodes API for UTA Planner",
        "Environment": process.env.NODE_ENV,
        "Service Port": process.env.RACENODES_APP_PORT,
        "Working Path": process.cwd(),
        "Database": process.cwd() + process.env.RACENODES_APP_DB,
    });
};

export {
    appRoot,
    appAbout
};
