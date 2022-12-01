import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callMyCardAPI } from "../../apis/CardAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import MyCardDetailModal from "./MyCardDetaillModal";

function Card () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const card = useSelector(state => state.cardReducer);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const [myCardDetailModal, setMyCardDetailModal] = useState(false);

    useEffect(
        () => {
            
            if(token) {
            dispatch(callMyCardAPI({
                memberId: token.sub
            }));
            }

        }, []
    );

    const onClickOfficeCardHandler = () => {
        setMyCardDetailModal(true);
    }

    const onClickCustomerCardHandler = () => {
        navigate('/card/customers');
    }

    console.log('card', card);

    return (
        <>
            {
                myCardDetailModal ?
                <MyCardDetailModal
                    card={card}
                    setMyCardDetailModal={ setMyCardDetailModal }
                />
                : null
            }
            { card &&
            <div>
                <h3>{ card.memberName }</h3>
                <div key={ card.memberNo }>
                    <h5>부서{ card?.dept?.deptName }</h5>
                    <h5>직책{ card?.position?.positionName }</h5>
                    <h5>전화번호{ card.memberPhone }</h5>
                    <h5>이메일{ card.memberEmail }</h5>
                </div>
                <button
                    onClick={ onClickOfficeCardHandler }
                >
                수정
                </button>
            </div>
            }
            <button
            >
                사내 명함 조회
            </button>
            <button
                onClick={ onClickCustomerCardHandler }
            >
                거래처 명함 조회
            </button>
        </>
    );

}

export default Card;