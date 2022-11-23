import { combineReducers } from 'redux';
import roomReducer from "./roomModule";
import attendanceReducer from "./AttendanceModule";
import memberReducer from './MemberModules';
import reservationReducer from './reservationModule';

const rootReducer = combineReducers({
    roomReducer,
    attendanceReducer,
    memberReducer,
    reservationReducer
});

export default rootReducer;