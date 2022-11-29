import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callOffDetailAPI } from "../../apis/OffAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function OffDetail() {

    const dispatch = useDispatch();
    const offs = useSelector(state => state.offReducer);
    console.log('offs' , offs);
    const params = useParams();
    const offNo = params.offNo;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    useEffect(
        () => {
            dispatch(callOffDetailAPI({
                offNo : offNo
            }));
        }, []
    );

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
                        { offs.offResult === "대기" && <button>수정</button> }
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
                        { offs.offResult === "대기" && <button>승인</button> }
                        { offs.offResult === "대기" && <button>반려</button> }
                    </div>
                : null
            }
        </>
    );

}

export default OffDetail;