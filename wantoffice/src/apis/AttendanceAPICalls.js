import { POST_IN } from "../modules/AttendanceModule";

export const callInRegistAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/attendance/in`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept" : "*/*",
                /*"Authorization" : "Bearer " + window.localStorage.getItem('accessToken')*/
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendanceAPICalls] callInRegistAPI result : ', result);
            dispatch({ type: POST_IN, payload: result.data });
        }

    }

}