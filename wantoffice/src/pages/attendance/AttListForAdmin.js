import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import { useEffect, useState } from "react";
import { callAttListForAdminAPI } from "../../apis/AttendanceAPICalls";
import { useDispatch, useSelector } from "react-redux";
import RoomListCSS from "../../pages/room/RoomList.module.css";

function AttListForAdmin() {

    const dispatch = useDispatch();
    const attendances = useSelector(state => state.attendanceReducer);
    const attendanceList = attendances.data;
    const [currentPage, setCurrentPage] = useState(1);

    const now = new Date();
    const [date, setDate] = useState(now);

    function toStringByFormatting(source, delimiter = "-") {
        const year = source.getFullYear();
        const month = source.getMonth() + 1;
        const day = source.getDate();

        return [year, (month < 10 ? "0"+month : month), (day < 10 ? "0"+day : day)].join(delimiter);
    }

    const handleSelectDate = (selectedDate) => {
        setDate(new Date(selectedDate));
        console.log('selectedDate : ', toStringByFormatting(new Date(selectedDate)));
        dispatch(callAttListForAdminAPI({search : toStringByFormatting(new Date(selectedDate)), currentPage : currentPage}));
    };

    useEffect(
        () => {
            dispatch(callAttListForAdminAPI({search : toStringByFormatting(date), currentPage : currentPage}));
        }, [date, currentPage]
    );

    const pageBtn = attendances.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <>
            <div>
                <h2>날짜별 근태 조회</h2>
            </div>
            <DatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                selected={date}
                onChange={handleSelectDate}
                popperPlacement="auto"
            />
            <div>
                <table>
                    <colgroup>
                        <col width="5.5%"/>
                        <col width="13.5%"/>
                        <col width="13.5%"/>
                        <col width="13.5%"/>
                        <col width="13.5%"/>
                        <col width="13.5%"/>
                        <col width="13.5%"/>
                        <col width="13.5%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>근무유형</th>
                            <th>날짜</th>
                            <th>출근시간</th>
                            <th>퇴근시간</th>
                            <th>부서</th>
                            <th>직책</th>
                            <th>이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(attendanceList) && attendanceList.map(
                                (attendance) => (
                                    <tr
                                        key={ attendance.attNo }
                                    >
                                        <td>{ attendance.attNo }</td> 
                                        <td>{ attendance.attType }</td> 
                                        <td>{ attendance.attDate }</td> 
                                        <td>{ attendance.attIn }</td> 
                                        <td>{ attendance.attOut }</td>
                                        <td>{ attendance.member.dept.deptName }</td>
                                        <td>{ attendance.member.position.positionName }</td>
                                        <td>{ attendance.member.memberName }</td>
                                    </tr>
                                )
                            )      
                        }
                    </tbody>
                </table>
            </div>
            <div className={ RoomListCSS.roomPgs }>
                {
                    Array.isArray(attendanceList) &&
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
                    Array.isArray(attendanceList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage + 1) }
                        disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
            </div>
        </>
    );

}

export default AttListForAdmin;