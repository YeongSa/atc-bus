import "./App.css";
import PassengerMain from "./components/passenger/PassengerMain";

function App() {
  return (
    <div className="app">
      <header>
        <h1>ATCBUS - Demo 0.2</h1>
        <p>Просмотр от лица</p>
        <a href="/passenger" className="active">
          Пассажира
        </a>
        <a href="/driver">Водителя</a>
      </header>
      <main>
        <PassengerMain />
      </main>
    </div>
  );
}

export default App;
