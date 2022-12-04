import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FindIdResultCSS from './FindIdResultModal.module.css';

function FindIdResultModal({setFindIdResultModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const memberDetail = member.data;

    useEffect(() => {

        if(member.status === 200) {
            console.log("[FindIdResult] 아이디 찾기 성공 ", member);
        }
    }, []);

    const onClickGoLoginHandler = () => {
        navigate("/", {replace : true});
    }

    return (
        <div className={ FindIdResultCSS.contentDiv }>

            { memberDetail && 
            <p>{ memberDetail.memberName } 님의 아이디 찾기 결과는
            { memberDetail.memberId } 입니다. </p>
            }

            <button
                className={ FindIdResultCSS.goLoginBtn }
                onClick={ onClickGoLoginHandler }
            > 로그인 하기
            </button>
        </div>
    );


}

export default FindIdResultModal;