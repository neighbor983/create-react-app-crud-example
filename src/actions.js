export const SET_GAMES = 'SET_GAMES';

export function setGames(games) {
    return {
        type: SET_GAMES,
        games
    };
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function saveGame(data) {
    const url = 'https://create-react-app-example-neighbor983.c9users.io:8080/api/games';
    return dispatch => {
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse);
    };
}

export function fetchGames() {
    const url = 'https://create-react-app-example-neighbor983.c9users.io:8080/api/games';
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(data => dispatch(setGames(data.games)));
    };
}
