import ReservationListCSS from "./ReservationList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callReservationListAPI } from '../../apis/RoomAPICalls';
import { NavLink, useParams } from "react-router-dom";


function ReservationList(){

    const dispatch = useDispatch();
    const reservation = useSelector(state => state.reservationReducer);
    const reservationList = reservation.data;
    const params = useParams();
    const roomNo = params.roomNo;
    // const [currentPage, setCurrentPage] = useState(1);

    console.log(reservation, reservationList);

    // const date = '2022-11-25';

    useEffect(
        () => {
            console.log('useEffect 동작 확인');
            dispatch(callReservationListAPI({
                roomNo : roomNo
            }));
        },
        []
    );
    
    

    

    return(
        <>

            
{/* { reservation &&  */}
            <div className={ReservationListCSS.rvListDiv}>
                <h2>회의실 예약 안내</h2>
                
                <table className={ReservationListCSS.rvtblDiv}>
                    <th>순번</th>
                    <th>예약 시간</th>
                    <th>예약 상태</th>
                    <th> 비고 </th>
                    <tr>
                        <input type="checkbox"/>
                        <td>1</td>
                        <label>
                        9:00 ~ 10:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                    <tr>
                        <input type="checkbox"/>
                        <td>2</td>
                        <label>
                        10:00 ~ 11:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                    <tr>
                        <input type="checkbox"/>
                        <td>3</td>
                        <label>
                        11:00 ~ 12:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                    <tr>
                        <input type="checkbox"/>
                        <td>4</td>
                        <label>
                        12:00 ~ 13:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                    <tr>
                        <input type="checkbox"/>
                        <td>5</td>
                        <label>
                        13:00 ~ 14:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                    <tr>
                        <input type="checkbox"/>
                        <td>6</td>
                        <label>
                        14:00 ~ 15:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                    <tr>
                        <input type="checkbox"/>
                        <td>7</td>
                        <label>
                        15:00 ~ 16:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                    <tr>
                        <input type="checkbox"/>
                        <td>8</td>
                        <label>
                        16:00 ~ 17:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                    <tr>
                        <input type="checkbox"/>
                        <td>9</td>
                        <label>
                        17:00 ~ 18:00
                        </label>
                        <td>{reservation.reservationStatus}</td>
                    </tr>
                </table>

                <NavLink to="/">예약 신청</NavLink>
                
                
            
            </div>
            {/* } */}
        </>
    );

}

export default ReservationList;