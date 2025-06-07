## Nodes API for UTA Planner

This Node.js app is the backend API for UTA Planner. Based on the previous race result, it'll form the proportion data by specified parameters. The UTA Planner will fetch these data via the API interface, then generate the race time schedule.

### Running Locally
```
pnpm install
```

#### Compile and hot-reload for development
```
pnpm dev
```

### API Interface
1. https://utanodes.vercel.app/event?event=[...]
2. https://utanodes.vercel.app/nodes?event=[...]&finishtime=[...]&reference=[...]

here:
```
  event: race, 1 for UTA100, 5 for UTA Miler
  finishtime: expected finish time, [13, ..., 28] or [19, ..., 44.5]
  reference: reference dataset, 50, 100, 150, 200 or 0 (full dataset)
```

### App Deployment and Management
https://vercel.com/bigonezs-projects/utanodes

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/bigonezs-projects/utanodes)

### UTA Planner
Access to the frontend of UTA Planner to get the UTA races' time schedule.

https://utaplanner.vercel.app
