type ApiConfig = {
    [key: string]: {
        [key: string]: string;
    };
}; // define the map type to store api urls

const apiConfig:ApiConfig = {
    local: {
        fantasyRanking: 'http://0.0.0.0:5001/fantasyContest/displayContestRanking?match_id={matchId}', 
        pointsSummary: 'http://0.0.0.0:5001/fantasyContest/displayFullSquadSummary?match_id={matchId}&user_id={userId}&user_name={userName}'
    },
    remote: {
        fantasyRanking: 'https://pe1nvrpbz4.execute-api.us-east-1.amazonaws.com/dev/fantasyContest/displayContestRanking?match_id={matchId}', 
        pointsSummary: 'https://pe1nvrpbz4.execute-api.us-east-1.amazonaws.com/dev/fantasyContest/displayFullSquadSummary?match_id={matchId}&user_id={userId}&user_name={userName}'
    }
  }; 

// Set the active environment flag
const ENV = 'local'; // Change to 'remote' for production

// Function to get the URL and replace {matchId} with the actual value
export const getApiUrl = (endpoint:string, params: { [key: string]: any } = {}): string => {
  let url = apiConfig[ENV][endpoint];
  for (const param in params) {
    url = url.replace(`{${param}}`, encodeURIComponent(params[param]));
  }
  return url;
};