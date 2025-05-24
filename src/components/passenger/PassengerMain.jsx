import "./passengerMain.css";
import { busStops } from "../../data";
import UserInfo from "./UserInfo";
import { useState } from "react";

const PassengerMain = () => {
  const [selectedStop, setSelectedStop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStops = busStops.filter((stop) =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="passenger-main">
      <UserInfo />

      <div className="selection-section">
        <div className="date-container">
          <h2>Выберите смену:</h2>
          <div className="day">
            <span className="shift-selected">Сегодня</span>
            <span>Завтра</span>
          </div>
          <div className="shift">
            <span>Утро</span>
            <span>День</span>
            <span className="shift-selected">Вечер</span>
          </div>
        </div>

        <div className="search-container">
          <h2>Выберите остановку</h2>
          <input
            type="text"
            placeholder="Поиск остановок..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="stop-list">
        {filteredStops.length > 0 ? (
          filteredStops.map((stop) => (
            <div
              key={stop.id}
              className={`stop-item ${
                selectedStop?.id === stop.id ? "selected" : ""
              }`}
              onClick={() => setSelectedStop(stop)}
            >
              <div className="stop-name">{stop.name}</div>
            </div>
          ))
        ) : (
          <div className="no-results">Остановки не найдены</div>
        )}
      </div>

      <div className="preview-section">
        {selectedStop ? (
          <div className="stop-preview">
            <h2>Выбрано</h2>
            <h3>{selectedStop.name}</h3>
            <h4>Автобус будет в:</h4>
            <div className="timetable">
              {selectedStop.times.map((time) => (
                <span className="time">{time}</span>
              ))}
            </div>
          </div>
        ) : (
          <p className="no-selection">
            Выберите остановку для просмотра информации
          </p>
        )}
      </div>

      <button className="confirm" disabled={!selectedStop}>
        Подтвердить
      </button>
    </div>
  );
};

export default PassengerMain;
