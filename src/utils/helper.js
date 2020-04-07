const moment = require("moment");

export const headerFilters = (data) => {
  return [
    {
      name: "Total Trucks",
      count: data.length,
    },
    {
      name: "Running Trucks",
      count: commonHandler.runningTrucks(data).count,
    },
    {
      name: "Stopped Trucks",
      count: commonHandler.stoppedTrucks(data).count,
    },
    {
      name: "Idle Trucks",
      count: commonHandler.idleTrucks(data).count,
    },
    {
      name: "Error Trucks",
      count: 2000,
    },
  ];
};

export const commonHandler = {
  runningTrucks: (data) => {
    return {
      data: data.filter((a) => a.lastRunningState.truckRunningState === 1),
      count: data.filter((a) => a.lastRunningState.truckRunningState === 1)
        .length,
    };
  },
  stoppedTrucks: (data) => {
    return {
      data: data.filter(
        (a) =>
          a.lastRunningState.truckRunningState === 0 &&
          !a.lastWaypoint.ignitionOn
      ),
      count: data.filter(
        (a) =>
          a.lastRunningState.truckRunningState === 0 &&
          !a.lastWaypoint.ignitionOn
      ).length,
    };
  },
  idleTrucks: (data) => {
    return {
      data: data.filter(
        (a) =>
          a.lastRunningState.truckRunningState === 0 &&
          a.lastWaypoint.ignitionOn
      ),
      count: data.filter(
        (a) =>
          a.lastRunningState.truckRunningState === 0 &&
          a.lastWaypoint.ignitionOn
      ).length,
    };
  },
};

export const statusCheck = (a) => {
  let color = "";
  let status = "";
  if (a.lastRunningState.truckRunningState === 1) {
    color = "green";
    status = "running";
  }
  if (
    a.lastRunningState.truckRunningState === 0 &&
    !a.lastWaypoint.ignitionOn
  ) {
    color = "blue";
    status = "stopped";
  }
  if (a.lastRunningState.truckRunningState === 0 && a.lastWaypoint.ignitionOn) {
    color = "yellow";
    status = "idle";
  }
  return { status, color };
};
