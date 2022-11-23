import { POST_IN, GET_IN, POST_OUT, GET_OUT } from "../modules/AttendanceModule";

export const callInRegistAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/attendance/in`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendanceAPICalls] callInRegistAPI result : ', result);
            dispatch({ type: POST_IN, payload: result.data });
        }

    }

}

export const callInAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/attendance/in`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendanceAPICalls] callInAPI result : ', result);
            dispatch({ type: GET_IN, payload: result.data });
        }

    }

}

export const callOutRegistAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/attendance/out`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendanceAPICalls] callOutRegistAPI result : ', result);
            dispatch({ type: POST_OUT, payload: result.data });
        }

    }

}

export const callOutAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/attendance/out`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendanceAPICalls] callOutAPI result : ', result);
            dispatch({ type: GET_OUT, payload: result.data });
        }

    }

}