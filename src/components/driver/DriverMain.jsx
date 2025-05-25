import "./driverMain.css";
import { busStops } from "../../data";
import { useState } from "react";

const DriverMain = () => {
  const [selectedDay, setSelectedDay] = useState("today");
  const [selectedShift, setSelectedShift] = useState("morning");

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

  return (
    <div className="driverMain">
      <div className="date-selector">
        <span
          className={selectedDay === "today" && "active"}
          onClick={() => setSelectedDay("today")}
        >
          Сегодня
          <p>{today}</p>
        </span>
        <span
          className={selectedDay === "tomorrow" && "active"}
          onClick={() => setSelectedDay("tomorrow")}
        >
          Завтра
          <p>{getTomorrow()}</p>
        </span>
      </div>

      <div className="stops">
        <div className="day-selector">
          <span
            className={selectedShift === "morning" && "day-active"}
            onClick={() => setSelectedShift("morning")}
          >
            Утро
          </span>
          <span
            className={selectedShift === "day" && "day-active"}
            onClick={() => setSelectedShift("day")}
          >
            День
          </span>
          <span
            className={selectedShift === "night" && "day-active"}
            onClick={() => setSelectedShift("night")}
          >
            Ночь
          </span>
        </div>

        {busStops.map((stop) => {
          return stop.passengers.length > 0 ? (
            <div className="stop " key={stop.id}>
              <div className="stop-info">
                <p className="stop-name">{stop.name}</p>
              </div>
              <ol>
                {stop.passengers.map((passenger) => (
                  <li key={passenger}>{passenger}</li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="stop empty" key={stop.id}>
              <p className="stop-name">{stop.name}</p>
              <i>Пассажиров еще нет</i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriverMain;
