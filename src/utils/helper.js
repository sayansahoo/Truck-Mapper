const moment = require("moment");

export const headerFilters = (data) => {
  return [
    {
      name: "Total Trucks",
      count: data.length,
      id: 0
    },
    {
      name: "Running Trucks",
      count: commonHandler.runningTrucks(data).count,
      id: 1
    },
    {
      name: "Stopped Trucks",
      count: commonHandler.stoppedTrucks(data).count,
      id:2
    },
    {
      name: "Idle Trucks",
      count: commonHandler.idleTrucks(data).count,
      id:3
    },
    {
      name: "Error Trucks",
      count: commonHandler.errorTrucks(data).count,
      id:4
    },
  ];
};

export const commonHandler = {
  runningTrucks: (data) => {
    return {
      data: data.filter((a) => statusCheck(a).status === "Running"),
      count: data.filter((a) => statusCheck(a).status === "Running").length,
    };
  },
  stoppedTrucks: (data) => {
    return {
      data: data.filter((a) => statusCheck(a).status === "Stopped"),
      count: data.filter((a) => statusCheck(a).status === "Stopped").length,
    };
  },
  idleTrucks: (data) => {
    return {
      data: data.filter((a) => statusCheck(a).status === "Idle"),
      count: data.filter((a) => statusCheck(a).status === "Idle").length,
    };
  },
  errorTrucks: (data) => {
    return {
      data: data.filter((a) => statusCheck(a).status === "Error"),
      count: data.filter((a) => statusCheck(a).status === "Error").length,
    };
  },
};

export const setDate = (a) => {
  let date = (Date.now() - a) / (1000 * 60 * 60);
  return date;
};

export const timeElapsed = (a) => {
  let time = setDate(a);
  let days = "";
  let minutes = "";
  let seconds = "";
  if (time > 24) {
    days = time / 24;
    return `${Math.round(days)} d`;
  }
  if (time < 1) {
    minutes = time * 60;
    if (minutes < 1) {
      seconds = minutes * 60;
      return `${Math.round(seconds)} s`;
    }
    return `${Math.round(minutes)} m`;
  }
  return `${Math.round(time)} h`;
};

export const statusCheck = (a) => {
  let color = "";
  let status = "";
  if (
    a.lastRunningState.truckRunningState === 1 &&
    setDate(a.lastWaypoint.createTime) < 4
  ) {
    color = "green";
    status = "Running";
  } else if (
    a.lastRunningState.truckRunningState === 0 &&
    !a.lastWaypoint.ignitionOn &&
    setDate(a.lastWaypoint.createTime) < 4
  ) {
    color = "blue";
    status = "Stopped";
  } else if (
    a.lastRunningState.truckRunningState === 0 &&
    a.lastWaypoint.ignitionOn &&
    setDate(a.lastWaypoint.createTime) < 4
  ) {
    color = "yellow";
    status = "Idle";
  } else if (setDate(a.lastWaypoint.createTime) > 4) {
    color = "red";
    status = "Error";
  }
  return { status, color };
};
