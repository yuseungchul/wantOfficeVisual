import { GET_APPROVALS } from "../modules/ApprovalModule.js";

/* 전체 결재목록 조회 */
// export const callApprovalListAPI = ({currentPage = 1}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/aproval/list?page=${currentPage}`; 

//     return async (dispatch, getState) => {

//         console.log('callApprovalListAPI 동작 확인');

//         const result = await fetch(requestURL, {
//             method : "GET",
//             headers : {
//                 "Content-Type" : "application/json",
//                 "Accept": "*/*",
//                 "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());

//         if(result.status === 200) {
//             console.log('[AprovalAPICalls] callApprovalListAPI result : ', result);
//             dispatch({ type: GET_APPROVALS, payload: result.data });
//         }
//     }
// }


export const callApprovalListAPI = ({docNo, currentPage = 1}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/aproval/list?page=${currentPage}`; 

    return async (dispatch, getState) => {

        console.log('callApprovalListAPI 동작 확인');

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AprovalAPICalls] callApprovalListAPI result : ', result);
            dispatch({ type: GET_APPROVALS, payload: result.data });
        }
    }
}