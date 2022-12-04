import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCardsAPI } from "../../apis/CardAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import { NavLink } from "react-router-dom";
import CardCSS from "../card/Card.module.css";

function OfficeCardList () {

    const dispatch = useDispatch();
    const members = useSelector(state => state.cardReducer);
    const memberList = members.data;
    const [currentPage, setCurrentPage] = useState();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    useEffect(
        () => {
            dispatch(callCardsAPI({currentPage : currentPage}));
        }, [currentPage]
    );

    const pageBtn = members.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <>
            <div>
                <section className={CardCSS.submenu}>
                    <br></br>
                    <h3>Card</h3>
                    <div className={CardCSS.submenuDiv}>
                        <h4>명함</h4>
                        <ul className={CardCSS.submenuUl} >
                            <li> <NavLink to="/card/office" style={{ textDecoration: "none", color: "#505050" }}>사내 명함 조회</NavLink></li><br></br>
                            <li> <NavLink to="/card/customers" style={{ textDecoration: "none", color: "#505050" }}>거래처 명함 조회</NavLink></li>
                        </ul>
                    </div>
                </section>
                <div className={CardCSS.title}>
                    <span>사내 명함</span>
                </div>
                <div className={CardCSS.container}>
                    <div className={CardCSS.cardContainer}>
                        {
                            Array.isArray(memberList) && memberList.map(
                                (member) => (
                                    <div key={ member.memberNo } className={CardCSS.CardDiv}>
                                        <h3>{ member.memberName }</h3><hr></hr>
                                        <h4>부서　　　　{ member.dept?.deptName }</h4>
                                        <h4>직책　　　　{ member.position?.positionName }</h4>
                                        <h4>전화번호　　{ member.memberPhone }</h4>
                                        <h4>이메일　　　{ member.memberEmail }</h4>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className={CardCSS.adminPageDiv}>
                        {
                            Array.isArray(memberList) &&
                            <button
                                onClick={ () => setCurrentPage(currentPage - 1) }
                                disabled={ currentPage === 1 }
                                className={CardCSS.pagingBtn}
                            >
                                &lt;
                            </button>
                        }
                        {
                            pageNumber.map((num) => (
                                    <button
                                        onClick={ () => setCurrentPage(num) }
                                        className={CardCSS.num}
                                    >
                                        {num}
                                    </button>
                            ))
                        }
                        {
                            Array.isArray(memberList) &&
                            <button
                                onClick={ () => setCurrentPage(currentPage + 1) }
                                disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                                className={CardCSS.pagingBtn}
                            >
                                &gt;
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );

}

export default OfficeCardList;