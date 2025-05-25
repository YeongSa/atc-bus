import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PassengerMain from "./components/passenger/PassengerMain";
import DriverMain from "./components/driver/DriverMain";

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>ATCBUS - Demo 0.2</h1>
          <p>Просмотр от лица</p>
          <Link to="/passenger" className="active">
            Пассажира
          </Link>
          <Link to="/driver">Водителя</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PassengerMain />} />
            <Route path="/passenger" element={<PassengerMain />} />
            <Route path="/driver" element={<DriverMain />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
