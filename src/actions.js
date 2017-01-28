export const SET_GAMES = 'SET_GAMES';

export function setGames(games){
    return {
        type: SET_GAMES,
        games
    };
}


export function fetchGames(){
    const url = 'http://create-react-app-example-neighbor983.c9users.io:8080/api/games';
    return dispatch => {
        fetch(url)
        .then(res => res.json())
        .then(data =>dispatch(setGames(data.games)));
    };
}