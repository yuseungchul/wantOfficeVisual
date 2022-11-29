import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callAppUpdateAPI, callOffDetailAPI, callReturnUpdateAPI } from "../../apis/OffAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function OffDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const offs = useSelector(state => state.offReducer);

    const params = useParams();
    const offNo = params.offNo;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const navigateToUpdate = () => {
        navigate(`/off/modify/${offNo}`);
    };

    useEffect(
        () => {
            dispatch(callOffDetailAPI({
                offNo : offNo
            }));
        }, []
    );

    const onClickAppHandler = () => {
        dispatch(callAppUpdateAPI({
            offNo : offNo
        }));
        navigate('/off/result');
        window.location.reload();
    }

    const onClickReturnHandler = () => {
        dispatch(callReturnUpdateAPI({
            offNo : offNo
        }));
        navigate('/off/result');
        window.location.reload();
    }

    return (
        <>
            { offs.approval && token &&
                (token.sub === offs.member?.memberId)
                ?
                    <div>
                        <h3>제목　　　　{ offs.offTitle }</h3>
                        <h3>연차기간　　{ offs.offStart }~{ offs.offEnd }</h3>
                        <h3>연차사유　　{ offs.offReason }</h3>
                        <h3>결재권자　　{ offs.approval.memberName }</h3>
                        { offs.offResult === "대기" && <button onClick={navigateToUpdate}>수정</button> }
                    </div>
                : null
            }
            { offs.approval && token &&
                (token.sub === offs.approval?.memberId)
                ?
                    <div>
                        <h3>신청자　　　{ offs.member.memberName }</h3>
                        <h3>부서　　　　{ offs.member.dept.deptName }</h3>
                        <h3>직책　　　　{ offs.member.position.positionName }</h3>
                        <h3>제목　　　　{ offs.offTitle }</h3>
                        <h3>연차기간　　{ offs.offStart }~{ offs.offEnd }</h3>
                        <h3>연차사유　　{ offs.offReason }</h3>
                        { offs.offResult === "대기" && <button onClick={onClickAppHandler}>승인</button> }
                        { offs.offResult === "대기" && <button onClick={onClickReturnHandler}>반려</button> }
                    </div>
                : null
            }
        </>
    );

}

export default OffDetail;