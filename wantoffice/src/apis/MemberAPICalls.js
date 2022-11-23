import { POST_LOGIN } from "../modules/MemberModules";

export const callLoginAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/account/login`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            },
            body : JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword
            })
        })
        .then(response => response.json());
        
        if(result.status === 200) {
            console.log('[MemberAPICalls] callLoginAPI result : ', result);
            window.localStorage.setItem('accessToken', result.data.accessToken);
            dispatch({ type: POST_LOGIN, payload: result });
        }
    }
}

export const callLogoutAPI = () => {

    return async (dispatch, getState) => {
        
        dispatch({ type: POST_LOGIN, payload: ''});
        console.log('[MemberAPICalls] callLogoutAPI result : SUCCESS');
    }
}



