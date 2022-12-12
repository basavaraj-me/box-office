import { useReducer, useEffect, useState } from 'react';
import { apiGet } from './config';

function showsReducer(prevState, action) {
    switch (action.type) {
        case 'ADD': {
            return [...prevState, action.showId];
        }
        case 'REMOVE': {
            return prevState.filter((showId) => showId !== action.showId);
        }

        default:
            return prevState;
    }
}
function usePersistedReducer(reducer, initialState, key) {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const persisted = localStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : initial;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, dispatch];
}

export function useShows(key = 'shows') {
    return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
    const [input, setInput] = useState(() => {
        const persisted = sessionStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : '';
    });
    const setPersistedInput = (newState) => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));
    };
    return [input, setPersistedInput];
}
// eslint-disable-next-line consistent-return
const reducer = (prevState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return {
                isLoading: false,
                error: false,
                show: action.show,
            };
        }
        case 'FETCH_FAILED': {
            return {
                ...prevState,
                isLoading: false,
                error: action.errror,
            };
        }
    }
};

export function useShow(showId) {
    const [state, dispatch] = useReducer(reducer, {
        show: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let isMount = true;
        apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
            .then((results) => {
                if (isMount) {
                    dispatch({
                        type: 'FETCH_SUCCESS',
                        show: results,
                    });
                }
            })
            .catch((err) => {
                if (isMount) {
                    dispatch({
                        type: 'FETCH_FAILED',
                        error: err.message,
                    });
                }
            });
        return () => {
            isMount = false;
        };
    }, [showId]);
    return state;
}
