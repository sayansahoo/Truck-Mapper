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
      count: commonHandler.errorTrucks(data).count,
    },
  ];
};

export const commonHandler = {
  runningTrucks: (data) => {
    return {
      data: data.filter((a) => statusCheck(a).status === "running"),
      count: data.filter((a) => statusCheck(a).status === "running").length,
    };
  },
  stoppedTrucks: (data) => {
    return {
      data: data.filter((a) => statusCheck(a).status === "stopped"),
      count: data.filter((a) => statusCheck(a).status === "stopped").length,
    };
  },
  idleTrucks: (data) => {
    return {
      data: data.filter((a) => statusCheck(a).status === "idle"),
      count: data.filter((a) => statusCheck(a).status === "idle").length,
    };
  },
  errorTrucks: (data) => {
    return {
      data: data.filter((a) => statusCheck(a).status === "error"),
      count: data.filter((a) => statusCheck(a).status === "error").length,
    };
  },
};

export const setDate = (a) => {
  let date = Math.floor((Date.now() - a) / (1000 * 60 * 60));
  return date;
};

export const statusCheck = (a) => {
  let color = "";
  let status = "";
  if (
    a.lastRunningState.truckRunningState === 1 &&
    setDate(a.lastWaypoint.createTime) < 4
  ) {
    color = "green";
    status = "running";
  } else if (
    a.lastRunningState.truckRunningState === 0 &&
    !a.lastWaypoint.ignitionOn &&
    setDate(a.lastWaypoint.createTime) < 4
  ) {
    color = "blue";
    status = "stopped";
  } else if (
    a.lastRunningState.truckRunningState === 0 &&
    a.lastWaypoint.ignitionOn &&
    setDate(a.lastWaypoint.createTime) < 4
  ) {
    color = "yellow";
    status = "idle";
  } else if (setDate(a.lastWaypoint.createTime) > 4) {
    color = "red";
    status = "error";
  }
  return { status, color };
};
