import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCustomersAPI } from "../../apis/CardAPICalls";
import CustomerRegistModal from "./CustomerRegistModal";
import RoomListCSS from "../../pages/room/RoomList.module.css";
import { useNavigate } from "react-router-dom";
import CustomerDetailModal from "./CustomerDetailModal";

function CustomerList () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const customers = useSelector(state => state.cardReducer);
    const customerList = customers.data
    const [currentPage, setCurrentPage] = useState(1);
    const [customerRegistModal, setCustomerRegistModal] = useState(false);
    const [customerDetailModal, setCustomerDetailModal] = useState(false);

    const [customerNo, setCustomerNo] = useState();

    useEffect(
        () => {
            dispatch(callCustomersAPI({currentPage : currentPage}));
        }, [currentPage]
    );

    const onClickCustomerRegistHandler = () => {
        setCustomerRegistModal(true);
    }

    const onClickCustomerDetailHandler = (customerNo) => {
        setCustomerNo(customerNo);
        setCustomerDetailModal(true);
    }

    const pageBtn = customers.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <>
            {
                customerRegistModal ?
                <CustomerRegistModal
                    setCustomerRegistModal={ setCustomerRegistModal }
                />
                : null
            }
            {
                customerDetailModal ?
                <CustomerDetailModal
                    customerNo={customerNo}
                    setCustomerDetailModal={ setCustomerDetailModal }
                />
                : null
            }
            <div>
                <h2>거래처 명함</h2>
            </div>
            <div>
                {
                    Array.isArray(customerList) && customerList.map(
                        (customer) => (
                            <div key={ customer.customerNo } onClick={ () => onClickCustomerDetailHandler(customer.customerNo) }>
                                <h5>{ customer.customerEmployee }</h5>
                                <h5>회사명{ customer.customerName }</h5>
                                <h5>직책{ customer.customerPosition }</h5>
                                <h5>전화번호{ customer.customerPhone }</h5>
                                <h5>이메일{ customer.customerEmail }</h5>
                            </div>
                        )
                    )
                }
            </div>
            <div>
                {
                    Array.isArray(customerList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={ () => setCurrentPage(num) }>
                            <button
                                style={ currentPage === num ? { backgroundColor : 'red' } : null }
                                className= { RoomListCSS.pagingBtn }
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(customerList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage + 1) }
                        disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
            </div>
            <button
                onClick={ onClickCustomerRegistHandler }
            >
                거래처 명함 등록
            </button>
        </>
    );

}

export default CustomerList;