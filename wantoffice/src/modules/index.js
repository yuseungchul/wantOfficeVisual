import { combineReducers } from 'redux';
import roomReducer from "./roomModule";
import attendanceReducer from "./AttendanceModule";


const rootReducer = combineReducers({
    roomReducer,
    attendanceReducer
});

export default rootReducer;