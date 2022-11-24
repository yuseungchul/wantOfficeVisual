import { POST_LOGIN, POST_REGISTER } from "../modules/MemberModules";

/* 로그인 API */
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

/* 로그아웃 API */
export const callLogoutAPI = () => {

    return async (dispatch, getState) => {
        
        dispatch({ type: POST_LOGIN, payload: ''});
        console.log('[MemberAPICalls] callLogoutAPI result : SUCCESS');
    }
}

/* 사원등록 API */
export const callRegisterAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/signup`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                memberName: form.memberName,
                memberId: form.memberId,
                memberPassword: form.memberPassword,
                memberEmail: form.memberEmail,
                memberPhone: form.memberPhone,
                positionNo: form.positionNo,
                deptNo: form.deptNo
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callsRegisterAPI RESULT : ', result);

        if(result.status === 201) {
            dispatch({ type: POST_REGISTER, payload: result });
        }
    };
}



