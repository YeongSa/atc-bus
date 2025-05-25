import "./passengerMain.css";
import { busStops } from "../../data";
import { useState } from "react";
import UserInfo from "./UserInfo";

const PassengerMain = () => {
  const today = new Date().toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
  });

  const getTomorrow = () => {
    const todayDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(todayDate.getDate() + 1);

    return tomorrow.toLocaleDateString("ru-RU", {
      month: "long",
      day: "numeric",
    });
  };

  const [selectedStop, setSelectedStop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedShift, setSelectedShift] = useState("");

  const filteredStops = busStops.filter((stop) =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <UserInfo />

      <div className="passenger-main">
        <div className="selection-section">
          <div className="date-container">
            <h2>Выберите смену:</h2>
            <div className="day">
              <div onClick={() => setSelectedDay("today")}>
                <span className={selectedDay === "today" && "shift-selected"}>
                  Сегодня
                </span>
                <p>{today}</p>
              </div>
              <div onClick={() => setSelectedDay("tomorrow")}>
                <span
                  className={selectedDay === "tomorrow" && "shift-selected"}
                >
                  Завтра
                </span>
                <p>{getTomorrow()}</p>
              </div>
            </div>
            <div className="shift">
              <span
                className={selectedShift === 0 && "shift-selected"}
                onClick={() => setSelectedShift(0)}
              >
                Утро
              </span>
              <span
                className={selectedShift === 1 && "shift-selected"}
                onClick={() => setSelectedShift(1)}
              >
                День
              </span>
              <span
                className={selectedShift === 2 && "shift-selected"}
                onClick={() => setSelectedShift(2)}
              >
                Ночь
              </span>
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
                {selectedStop.times.map((time, index) => (
                  <span
                    key={time[0]}
                    className={`time ${
                      index === selectedShift ? "time-active" : ""
                    }`}
                  >
                    {time}
                  </span>
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
    </>
  );
};

export default PassengerMain;
