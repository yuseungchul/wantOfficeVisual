import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/contents/Login";
import Layout from "./layouts/Layout";
import Main from "./pages/contents/Main";
import CalendarLayout from "./layouts/CalendarLayout";
import Calendar from "./pages/calendar/Calendar";
import Error from "./pages/Error";
import RoomList from "./pages/room/RoomList";
import Attendance from "./pages/attendance/Attendance";
import AttendanceLayout from "./layouts/attendance/AttendanceLayout";
import RoomLayout from "./layouts/RoomLayout";
import RoomDetail from "./pages/room/RoomDetail";
import Member from "./pages/admin/management/Member";
import MemberLayout from "./layouts/management/MemberLayout";
import ReservationList from "./pages/reservation/ReservationList";
import MyAttList from "./pages/attendance/MyAttList";
import AttListForAdmin from "./pages/attendance/AttListForAdmin";
import MyOffList from "./pages/off/MyOffList";
import Off from "./pages/off/Off";
import OffListForApp from "./pages/off/OffListForApp";
import OffDetail from "./pages/off/OffDetail";
import ApprovalLayout from "./layouts/approval/ApprovalLayout";
import ApprovalMain from "./pages/approval/ApprovalMain";
import ReservationRegist from "./pages/reservation/ReservationRegist";
import Dept from "./pages/admin/dept/Dept";
import DeptLayout from "./layouts/management/DeptLayout";
import Position from "./pages/admin/position/Position";
import PositionLayout from "./layouts/management/PositionLayout";
import ReservDetail from "./pages/reservation/ReservDetail";
import RoomMInsert from "./pages/admin/room/RoomMInsert";
import OffUpdate from "./pages/off/OffUpdate";
import RoomMUpdate from "./pages/admin/room/RoomMUpdate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/> }/>
          <Route path="/main" element={ <Layout/> }/>
          <Route path="/" element={ <Main/> }/>
        <Route path="/calendar" element={ <CalendarLayout/> }>
          <Route index element={ <Calendar/> }/>
        </Route>
        <Route path="/attendance" element={ <AttendanceLayout/> }>
          <Route index element={ <Attendance/> }/>
          <Route path="/attendance/my" element={ <MyAttList/> }/>
          <Route path="/attendance/manage-list" element={ <AttListForAdmin/> }/>
        </Route>
        <Route path="/off" element={<AttendanceLayout/>  }>
          <Route index element={ <MyOffList/> }/>
          <Route path="/off/regist" element={ <Off/> }/>
          <Route path="/off/result" element={ <OffListForApp/> }/>
          <Route path="/off/:offNo" element={ <OffDetail/> }/>
          <Route path="/off/modify/:offNo" element={ <OffUpdate/> }/>
        </Route>
        <Route path="/room" element={<RoomLayout/>}>
          <Route index element={ <RoomList/> }/>
          <Route path="rooms/:roomNo" element={ <RoomDetail/> }/>
          <Route path="rvlist/:roomNo" element={ <ReservationList/> }/>
          <Route path="rvlists" element={ <ReservationRegist/> }/>
          <Route path="rvlists/:reservationNo" element={ <ReservDetail/> }/>
          <Route path="room-managements" element={ <RoomMInsert/> }/>
          <Route path="rooms-managements" element={ <RoomMUpdate/> }/>
        </Route>
        <Route path="/member" element={ <MemberLayout/> }>
          <Route index element={ <Member/>}/>
        </Route>
        <Route path="/dept" element={ <DeptLayout/> }>
          <Route index element={ <Dept/>}/>
        </Route>
        <Route path="/position" element={ <PositionLayout/> }>
          <Route index element={ <Position/>}/>
        </Route>
        <Route path="*" element={ <Error/> }/>
        <Route path="/Approval" element = { <ApprovalLayout/>}>
        <Route index element={ <ApprovalMain/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
