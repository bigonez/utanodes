const eventProfiles = {
    1: {
        event: 1,
        name: "UTA100",
        year: 2025
    },
    5: {
        event: 5,
        name: "UTA Miler",
        year: 2025
    }
};

const eventsConfig = {
    1: {  // UTA100
        startTimes: [380, 386, 400, 410, 419, 458, 462],
        minHours: 13,
        maxHours: 28
    },
    5: {  // UTA Miler
        startTimes: [300],
        minHours: 24,
        maxHours: 44
    },

};

export {
    eventProfiles,
    eventsConfig
};
