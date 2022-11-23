import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/contents/member/Login";
import Layout from "./layouts/Layout";
import Main from "./pages/contents/member/Main";
import CalendarLayout from "./layouts/CalendarLayout";
import Calendar from "./pages/Calendar";
import Error from "./pages/Error";
import RoomList from "./pages/room/RoomList";
import Attendance from "./pages/attendance/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/> }/>
          <Route path="/main" element={ <Layout/> }/>
          <Route path="room" element={ <RoomList/> }/>
          <Route path="attendance" element={ <Attendance/> }/>
        <Route path="/calendar" element={ <CalendarLayout/> }>
          <Route index element={ <Calendar/> }/>
        </Route>
        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
