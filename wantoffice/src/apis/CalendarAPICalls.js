import { GET_SCHEDULES, GET_SCHEDULE, POST_SCHEDULE, PUT_SCHEDULE, DEL_SCHEDULE } from "../modules/CalendarModule";

export const callSchedulesAPI = ({}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendar`;

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
            console.log('[CalendarAPICalls] callScheduleAPI result : ', result);
            dispatch({ type: GET_SCHEDULES, payload: result.data });
        }

    }

}

export const callScheduleSelectAPI = ({scheduleNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendar/${scheduleNo}`;

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
            console.log('[CalendarAPICalls] callScheduleSelectAPI result : ', result);
            dispatch({ type: GET_SCHEDULE, payload: result.data})
        }
    }
}
