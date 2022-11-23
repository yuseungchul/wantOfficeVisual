import { combineReducers } from 'redux';
import roomReducer from "./roomModule";
import attendanceReducer from "./AttendanceModule";
import memberReducer from './MemberModules';


const rootReducer = combineReducers({
    roomReducer,
    attendanceReducer,
    memberReducer
});

export default rootReducer;