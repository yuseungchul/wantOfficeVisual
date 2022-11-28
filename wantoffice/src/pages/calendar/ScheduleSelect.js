import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callScheduleSelectAPI } from '../../apis/CalendarAPICalls'

function ScheduleSelect ({scheduleNo}) {

    const dispatch = useDispatch();
    const schedules = useSelector(state => state.productReducer);
    const params = useParams();
    const schedule = params.scheduleNo;

    useEffect(
        () => {
            dispatch(callScheduleSelectAPI({
                scheduleNo : schedule
            }));
        },
        []
    );

    return(
        <>
        <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>일정 제목</th>
                                <td>{ schedules.scheduleTitle || '' }</td>
                            </tr>
                            <tr>
                                <th>일정 시작일</th>
                                <td>{ schedules.scheduleStart || '' }</td>
                            </tr>
                            <tr>
                                <th>일정 종료일</th>
                                <td>{ schedules.scheduleEnd || '' }</td>
                            </tr>
                            <tr>
                                <th>일정 내용</th>
                                <td>{ schedules.scheduleContent || '' }</td>
                            </tr>
                            <tr>
                                <th>구분</th>
                                <td>{ schedules.scheduleSort || '' }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </>
    );
}

export default ScheduleSelect;