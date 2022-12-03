import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { callAppUpdateAPI, callOffDetailAPI, callReturnUpdateAPI } from "../../apis/OffAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import AttAndOffCSS from "../attendance/AttAndOff.module.css";

function OffDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const offs = useSelector(state => state.offReducer);

    const params = useParams();
    const offNo = params.offNo;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

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
            <div>
                <section className={AttAndOffCSS.submenu}>
                    <br></br>
                    <h3>Attendance</h3>
                    <div className={AttAndOffCSS.submenuDiv}>
                        <h4>근태</h4>
                        <ul className={AttAndOffCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/attendance/manage-list" style={{ textDecoration: "none", color: "#505050" }}>날짜별 근태 조회</NavLink></li> }
                        </ul>
                    </div>
                    <br></br>
                    <h3>Off</h3>
                    <div className={AttAndOffCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" &&<h4>연차</h4> }
                        { decoded === "ROLE_MEMBER" && <ul className={AttAndOffCSS.submenuUl} >
                            <li><NavLink to="/off" style={{ textDecoration: "none", color: "#505050" }}>연차 신청 조회</NavLink></li>
                            <li><NavLink to="/off/regist" style={{ textDecoration: "none", color: "#505050" }}>연차 신청</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> }
                        { decoded === "ROLE_APP_AUTH" && <h4>연차 관리</h4> }
                        { decoded === "ROLE_APP_AUTH" && <ul className={AttAndOffCSS.submenuUl} >
                            <li><NavLink to="/off/result" style={{ textDecoration: "none", color: "#505050" }}>결과별 연차 신청 조회</NavLink></li>
                        </ul>
                        }
                    </div>
                </section>
                <div className={AttAndOffCSS.offDetailDiv}>
                    <span>연차 신청</span>
                    { offs.approval && token &&
                        (token.sub === offs.member?.memberId)
                        ?
                            <div>
                                <table className={AttAndOffCSS.offDetailTable}>
                                    <colgroup>
                                        <col width="30%"/>
                                        <col width="70%"/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>제목</th>
                                            <td>{ offs.offTitle }</td>
                                        </tr>
                                        <tr>
                                            <th>연차기간</th>
                                            <td>{ offs.offStart }　~　{ offs.offEnd }</td>
                                        </tr>
                                        <tr>
                                            <th>연차사유</th>
                                            <td>{ offs.offReason }</td>
                                        </tr>
                                        <tr>
                                            <th>결재권자</th>
                                            <td>{ offs.approval.memberName }</td>
                                        </tr>
                                        <tr>
                                            <th>결과</th>
                                            <td>{ offs.offResult }</td>
                                        </tr>
                                    </tbody>
                                </table>
                                { offs.offResult === "대기" && <button onClick={navigateToUpdate} className={AttAndOffCSS.updateBtn}>수정</button> }
                                <button className={AttAndOffCSS.backBtn}>뒤로</button>
                            </div>
                        : null
                    }
                    { offs.approval && token &&
                        (token.sub === offs.approval?.memberId)
                        ?
                            <div>
                                <table className={AttAndOffCSS.offDetailTable}>
                                    <colgroup>
                                        <col width="30%"/>
                                        <col width="70%"/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>신청자</th>
                                            <td>{ offs.member.memberName }</td>
                                        </tr>
                                        <tr>
                                            <th>부서</th>
                                            <td>{ offs.member.dept.deptName }</td>
                                        </tr>
                                        <tr>
                                            <th>직책</th>
                                            <td>{ offs.member.position.positionName }</td>
                                        </tr>
                                        <tr>
                                            <th>제목</th>
                                            <td>{ offs.offTitle }</td>
                                        </tr>
                                        <tr>
                                            <th>연차기간</th>
                                            <td>{ offs.offStart }~{ offs.offEnd }</td>
                                        </tr>
                                        <tr>
                                            <th>연차사유</th>
                                            <td>{ offs.offReason }</td>
                                        </tr>
                                    </tbody>
                                </table>
                                { offs.offResult === "대기" && <button onClick={onClickAppHandler}>승인</button> }
                                { offs.offResult === "대기" && <button onClick={onClickReturnHandler}>반려</button> }
                            </div>
                        : null
                    }
                </div>
            </div>
        </>
    );

}

export default OffDetail;