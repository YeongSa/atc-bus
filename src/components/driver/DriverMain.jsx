import "./driverMain.css";
import { busStopsActual } from "../../data";
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
          className={selectedDay === "today" ? "active" : ""}
          onClick={() => setSelectedDay("today")}
        >
          Сегодня
          <p>{today}</p>
        </span>
        <span
          className={selectedDay === "tomorrow" ? "active" : ""}
          onClick={() => setSelectedDay("tomorrow")}
        >
          Завтра
          <p>{getTomorrow()}</p>
        </span>
      </div>

      <div className="stops">
        <div className="day-selector">
          <span
            className={selectedShift === "morning" ? "day-active" : ""}
            onClick={() => setSelectedShift("morning")}
          >
            Утро
          </span>
          <span
            className={selectedShift === "day" ? "day-active" : ""}
            onClick={() => setSelectedShift("day")}
          >
            День
          </span>
          <span
            className={selectedShift === "night" ? "day-active" : ""}
            onClick={() => setSelectedShift("night")}
          >
            Ночь
          </span>
        </div>

        {busStopsActual.map((stop, index) => {
          return stop.passengers.length > 0 ? (
            <div className="stop " key={stop.id}>
              <div className="stop-info">
                <div className="stop-name">
                  {stop.name}
                  {true ? (
                    <div>
                      <span className="stop-time-showcase">
                        {stop.times[0]}
                      </span>
                      <span className="stop-time">
                        {(
                          "0" +
                          Math.floor(
                            (Number(stop.times[0].replace(":", ".")) + 0.1) *
                              100
                          ) /
                            100
                        ).replace(".", ":")}
                      </span>
                    </div>
                  ) : (
                    <span className="stop-time">
                      {(
                        "0" +
                        (Number(stop.times[0].replace(":", ".")) + 0.1)
                      ).replace(".", ":")}
                    </span>
                  )}
                </div>
              </div>
              <ol>
                {stop.passengers.map((passenger) => (
                  <li key={passenger}>{passenger}</li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="stop empty" key={stop.id}>
              <div className="stop-name">
                {stop.name}
                {index ? (
                  <div>
                    <span className="stop-time-mute">{stop.times[0]}</span>
                  </div>
                ) : (
                  <span className="stop-time">{stop.times[0]}</span>
                )}
              </div>
              <i>Пассажиров еще нет</i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriverMain;
