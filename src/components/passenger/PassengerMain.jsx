import "./passengerMain.css";
import { busStops } from "../../data";
import UserInfo from "./UserInfo";
import { useState } from "react";

const PassengerMain = () => {
  const [selectedStop, setSelectedStop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStops = busStops.filter(
    (stop) =>
      stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stop.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="passenger-main">
      <UserInfo />

      <div className="selection-section">
        <div className="date-container">
          <h2>Выберите смену:</h2>
          <div className="day">
            <span>Сегодня</span>
            <span>Завтра</span>
          </div>
          <div className="shift">
            <span>Утро</span>
            <span>День</span>
            <span>Вечер</span>
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

      <div>
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
      </div>
    </div>
  );
};

export default PassengerMain;
