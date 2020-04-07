
const url = "https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint";
export const fetchTrucks = async () => {
    // Default options are marked with *
    const response = await fetch(url);
    return await response.json(); // parses JSON response into native JavaScript objects
  }



  