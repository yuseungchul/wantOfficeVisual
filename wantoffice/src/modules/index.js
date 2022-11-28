import { combineReducers } from 'redux';
import roomReducer from "./roomModule";
import attendanceReducer from "./AttendanceModule";
import memberReducer from './MemberModules';
import reservationReducer from './reservationModule';
import offReducer from './OffModule';

const rootReducer = combineReducers({
    roomReducer,
    attendanceReducer,
    memberReducer,
    reservationReducer,
    offReducer
});

export default rootReducer;