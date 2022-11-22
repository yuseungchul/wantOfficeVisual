import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/contents/Main";
import CalendarLayout from "./layouts/CalendarLayout";
import Calendar from "./pages/Calendar";
import Error from "./pages/Error";
import RoomList from "./pages/room/RoomList";
import Attendance from "./pages/attendance/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>
          <Route path="room" element={ <RoomList/> }/>
          <Route path="attendance" element={ <Attendance/> }/>
        </Route>
        <Route path="/calendar" element={ <CalendarLayout/> }>
          <Route index element={ <Calendar/> }/>
        </Route>
        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
