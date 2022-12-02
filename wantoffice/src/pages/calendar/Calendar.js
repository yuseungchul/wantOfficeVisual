import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { useDispatch, useSelector } from "react-redux";
import { callSchedulesAPI } from "../../apis/CalendarAPICalls";
import CalendarCSS from "./Calendar.module.css";
import { useEffect, useState } from "react";
import PersnalTitle from './title/PersnalTitle';
import CompanyTitle from './title/CompanyTitle';
import DeptTitle from './title/DeptTitle';
import moment from 'moment';


function Calendar() {

    const apiKey = process.env.REACT_APP_CAL_API_KEY;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schedules = useSelector(state => state.calendarReducer);
    const [persnalChecked, setPersnalChecked] = useState(true);
    const [companyChecked, setCompanyChecked] = useState(true);
    const [deptChecked, setDeptChecked] = useState(true);
    // const [Modal, setModal] = useState(false);

    const schedule = schedules.map(schedule => {
      return { title: schedule.scheduleTitle,
              content: schedule.scheduleContent,
              start : schedule.scheduleStart,
              end : schedule.scheduleEnd,
              backgroundColor : schedule.scheduleColor,
              sort : schedule.scheduleSort };
    });

    var index;
    for (index = 0; index < schedule.length; index++) {
      schedule[index].start = (schedule[index].start).substr(0, 10);
      schedule[index].end = (schedule[index].end).substr(0, 10);
    }

    var i;
    const persnal = [];
    const company = [];
    const dept = [];
    for(i = 0; i < schedule.length; i++) {
      if(Object.values(schedule[i])[5] === '개인') {
        persnal.push(schedule[i]);
      } else if(Object.values(schedule[i])[5] === '회사') {
        company.push(schedule[i]);
      } else if(Object.values(schedule[i])[5] === '부서') {
        dept.push(schedule[i]);
      } 
    } 

    const persnalTitleListHandler = (e) => {
      if(e.target.checked) {
        setPersnalChecked(true);
      } else if(!e.target.checked) {
        setPersnalChecked(false);
      }
    }

    const companyTitleListHandler = (e) => {
      if(e.target.checked) {
        setCompanyChecked(true);
      } else if(!e.target.checked) {
        setCompanyChecked(false);
      }
    }

    const deptTitleListHandler = (e) => {
      if(e.target.checked) {
        setDeptChecked(true);
      } else if(!e.target.checked) {
        setDeptChecked(false);
      }
    }

    // console.log('result : ', result);

    useEffect(
      () => {
          dispatch(callSchedulesAPI({
        }));
      }
      , []
  );

    // const test = JSON.stringify(schedule);
    // const result = JSON.parse(test);

    // -------------------------------------------------------- 더티 코드 리팩토링 필요
    var result = [];
    if(persnalChecked && companyChecked && deptChecked) {               // 셋 다 체크
      result = schedule;
    } else if (persnalChecked && companyChecked && !deptChecked){       // 개인, 회사
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '개인') {
          result.push(schedule[i])
        } else if(Object.values(schedule[i])[5] === '회사') {
          result.push(schedule[i]);
        }
      }
    } else if (persnalChecked && !companyChecked && !deptChecked){      // 개인
      result = persnal;
    } else if (!persnalChecked && !companyChecked && !deptChecked){     // 체크 안함
      result = null;
    } else if (!persnalChecked && !companyChecked && deptChecked){      // 부서
      result = dept;
    } else if (!persnalChecked && companyChecked && !deptChecked) {     // 회사
      result = company;
    } else if (!persnalChecked && companyChecked && deptChecked) {      // 회사, 부서
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '부서') {
          result.push(schedule[i])
        } else if(Object.values(schedule[i])[5] === '회사') {
          result.push(schedule[i]);
        }
      }
    } else if (persnalChecked && !companyChecked && deptChecked) {      // 개인, 부서
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '개인') {
          result.push(schedule[i])
        } else if(Object.values(schedule[i])[5] === '부서') {
          result.push(schedule[i]);
        }
      }
    }
    console.log(result);
    // -------------------------------------------------------- 더티 코드 리팩토링 필요

    return(
        <>
        <div className={CalendarCSS.calendarContainer}>
        <div className={CalendarCSS.calendarNav}>
          <h1> Schedule </h1>
          <input type='checkbox' defaultChecked='on' name='sort' value='개인' onClick= { persnalTitleListHandler }/>개인
            {persnalChecked ? <PersnalTitle/> : null }
          <input type='checkbox' defaultChecked='on' name='sort' value='회사' onClick= { companyTitleListHandler }/>회사
            {companyChecked ? <CompanyTitle/> : null }
          <input type='checkbox' defaultChecked='on' name='sort' value='부서' onClick= { deptTitleListHandler }/>부서
            {deptChecked ? <DeptTitle/> : null }
          <input type='checkbox' defaultChecked='on' name='sort' value='연차' />연차
              

        </div>
           <div className="cal-container">
              <FullCalendar
                plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                googleCalendarApiKey={apiKey}
                select={ function(e) {
                  const clickEnd = moment(e.endStr).subtract(1, 'day').format('YYYY-MM-DD');
                  alert('selected ' + e.startStr + ' to ' + e.endStr);
                  navigate(`/calendar/regist`, { state : { start : e.startStr, end : clickEnd }});
                }}
                events= {
                  // {'title': '제목3', 'content': '내용3', 'start': '2022-11-21', 'end': '2022-11-25', 'backgroundColor': '#C27EE2'},
                  // {title: '제목3', content: '내용3', start: '2022-12-24', end: '2022-12-25', backgroundColor: '#C27EE2'}
                result
                }
                
                eventDisplay={'block'}
                eventTextColor={'#FFF'}
                eventColor={'#F2921D'}
                height={'660px'}
              />
      
           </div>

           </div>
        </>
        
    );
    
}

export default Calendar;