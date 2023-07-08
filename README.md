# Nodes API for UTA100 Planner

This Node.js app is the backend API for UTA100 Planner. Based on the previous race result, it'll form the proportion data by specified parameters. The UTA100 Planner will fetch these data via the API interface, then generate the race time schedule.

## Running Locally
```
yarn install
```

#### Compile and hot-reload for development
```
yarn dev
```

## API Interface
https://utanodes.vercel.app/nodes?finishtime=[...]&reference=[...]

here:
```
  finishtime: expected finish time, [13, ..., 28 ]
  reference: reference dataset, 50, 100, 150, 200 or 0 (full dataset)
```

## App Deployment and Management
https://vercel.com/bigonez/utanodes

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/bigonez/utanodes)

## UTA 100 Planner
Access to the frontend of UTA100 Planner to get the UTA race time schedule.

https://utaplanner.vercel.app
