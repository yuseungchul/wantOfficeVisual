import { combineReducers } from 'redux';
import roomReducer from "./roomModule";
import attendanceReducer from "./AttendanceModule";
import memberReducer from './MemberModules';
import reservationReducer from './reservationModule';
import offReducer from './OffModule';
import calendarReducer from './CalendarModule';

const rootReducer = combineReducers({
    roomReducer,
    attendanceReducer,
    memberReducer,
    reservationReducer,
    offReducer,
    calendarReducer
});

export default rootReducer;