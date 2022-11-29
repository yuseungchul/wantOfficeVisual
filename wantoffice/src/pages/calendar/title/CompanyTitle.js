import { callSchedulesAPI } from "../../../apis/CalendarAPICalls";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CompanyTitle () {

    const dispatch = useDispatch();
    const schedules = useSelector(state => state.calendarReducer);

    var i;
    var companyTitle= [];
    for(i = 0; i < schedules.length; i++) {
      if(schedules[i].scheduleSort === '회사') {
        companyTitle.push(React.createElement('ul', {value : `${ schedules[i].scheduleNo }`, key : `${schedules[i].scheduleNo}`}, `${schedules[i].scheduleTitle}`));
      }

    }

    useEffect(
        () => {
            dispatch(callSchedulesAPI({
          }));
        }
        , []
    );

    return(
        <div>
            {companyTitle}
            </div>
    );

}

export default CompanyTitle;