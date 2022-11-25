import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/contents/Login";
import Layout from "./layouts/Layout";
import Main from "./pages/contents/Main";
import CalendarLayout from "./layouts/CalendarLayout";
import Calendar from "./pages/Calendar";
import Error from "./pages/Error";
import RoomList from "./pages/room/RoomList";
import Attendance from "./pages/attendance/Attendance";
import RoomLayout from "./layouts/RoomLayout";
import RoomDetail from "./pages/room/RoomDetail";
import Member from "./pages/admin/management/Member";
import AttendanceLayout from "./layouts/attendance/AttendanceLayout";
import ReservationList from "./pages/room/ReservationList";
// import RoomReservList from "./pages/RoomReserv/RoomReservList";
import MyAttList from "./pages/attendance/MyAttList";
import ReservDetail from "./pages/room/ReservDetail";
import MemberLayout from "./layouts/management/MemberLayout";

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
        </Route>
        <Route path="/room" element={<RoomLayout/>}>
          <Route index element={ <RoomList/> }/>
          <Route path="rooms/:roomNo" element={ <RoomDetail/> }/>
          <Route path="room/rvlist" element={ <ReservationList/> }/>
          <Route path="rvlists/:reservationNo" element={ <ReservDetail/> }/>
        </Route>
        <Route path="/member" element={ <MemberLayout/> }>
          <Route index element={ <Member/>}/>
        </Route>
        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
