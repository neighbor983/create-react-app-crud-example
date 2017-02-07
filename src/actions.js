export const SET_GAMES = 'SET_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const GAME_FETCHED = 'GAME_FETCHED';
export const GAME_UPDATED = 'GAME_UPDATED';
export const GAME_DELETED = 'GAME_DELETED';


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

export function setGames(games) {
    return {
        type: SET_GAMES,
        games
    }
}

export function addGame(game) {
    return {
        type: ADD_GAME,
        game
    }
}

export function gameFetched(game) {
    return {
        type: GAME_FETCHED,
        game
    }
}

export function gameUpdated(game) {
    return {
        type: GAME_UPDATED,
        game
    }
}

export function gameDeleted(gameId) {
    return {
        type: GAME_DELETED,
        gameId
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
            }).then(handleResponse)
            .then(data => dispatch(addGame(data.game)));
    };
}

export function updateGame(data) {
    const url = `https://create-react-app-example-neighbor983.c9users.io:8080/api/games/${data._id}`;
    return dispatch => {
        return fetch(url, {
                method: 'put',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(handleResponse)
            .then(data => dispatch(gameUpdated(data.game)));
    };
}

export function deleteGame(id) {
    const url = `https://create-react-app-example-neighbor983.c9users.io:8080/api/games/${id}`;
    return dispatch => {
        return fetch(url, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(handleResponse)
            .then(data => dispatch(gameDeleted(id)));
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

export function fetchGame(id) {
    const url = `https://create-react-app-example-neighbor983.c9users.io:8080/api/games/${id}`;
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(data => dispatch(gameFetched(data.game)));
    }
}
