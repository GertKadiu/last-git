import Create from './pages/Create';
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import EventPage from './pages/Events';
import CreateEvents from "./pages/CreateEvents"
import EditEvent from './pages/EditEvent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleUser from "./pages/SingleUser";
import SingleEvent from './pages/SingleEvent';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Update/:id" element={<Edit />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Events" element={<EventPage />} />
        <Route path="/editEvent/:id" element={<EditEvent />} />
        <Route path="/CreateEvents" element={<CreateEvents />} />
        <Route path="/SingleUser/:id" element={<SingleUser />} />
        <Route path="/SingleEvent/:id" element={<SingleEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
