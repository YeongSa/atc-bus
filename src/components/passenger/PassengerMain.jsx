import "./passengerMain.css";
import { busStops, users, busStopsActual } from "../../data";
import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import { useTime } from "../../hooks/useTime";
import ConfirmModal from "../modals/ConfirmModal";

// import { socket } from "../../socket.js";

const userData = users[1];

const shiftTable = ["Утро", "День", "Ночь"];

const PassengerMain = () => {
  // const [isConnected, setIsConnected] = useState(socket.connected);

  const [socketEvent, setSocketEvent] = useState([]);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onSocketEvent(value) {
  //     setSocketEvent((previous) => [...previous, value]);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("socketEvent", onSocketEvent);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("socketEvent", onSocketEvent);
  //   };
  // }, []);

  const [user, setUser] = useState(null);

  const { today, tomorrow } = useTime();

  const [selectedStop, setSelectedStop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const reset = () => {
    setSelectedShift(null);
    setSelectedDay(null);
    setSelectedStop(null);
    setShowConfirmModal(false);
  };

  const accept = (replaces = false, id) => {
    const newStop = {
      id: Math.random(),
      date: selectedDay,
      shift: selectedShift,
      stopId: selectedStop.id,
      stopName: selectedStop.name,
      busExpectedTime: selectedStop.times[selectedShift],
      selectedAt: new Date(),
    };

    if (replaces) {
      setUser((prev) => ({
        ...prev,
        stops: prev.stops.map((stop) => (stop.id === id ? newStop : stop)),
      }));
    } else {
      setUser((prev) => ({ ...prev, stops: [...prev.stops, newStop] }));
    }

    reset();
  };

  const deleteShift = (id) => {
    setUser((prev) => {
      const stops = prev.stops.filter((stop) => stop.id !== id);
      return { ...prev, stops };
    });
  };

  useEffect(() => setUser(userData), []);

  const filteredStops = busStops.filter((stop) =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <UserInfo user={user} shiftTable={shiftTable} deleteShift={deleteShift} />

      <div className="passenger-main">
        <div className="selection-section">
          <div className="date-container">
            <h2>Выберите смену:</h2>
            <div className="day">
              <div onClick={() => setSelectedDay(today)}>
                <span
                  className={
                    selectedDay?.short === today.short ? "shift-selected" : ""
                  }
                >
                  Сегодня
                </span>
                <p>{today.short}</p>
              </div>
              <div onClick={() => setSelectedDay(tomorrow)}>
                <span
                  className={
                    selectedDay?.short === tomorrow.short
                      ? "shift-selected"
                      : ""
                  }
                >
                  Завтра
                </span>
                <p>{tomorrow.short}</p>
              </div>
            </div>
            <div className="shift">
              <span
                className={selectedShift === 0 ? "shift-selected" : ""}
                onClick={() => setSelectedShift(0)}
              >
                Утро
              </span>
              <span
                className={selectedShift === 1 ? "shift-selected" : ""}
                onClick={() => setSelectedShift(1)}
              >
                День
              </span>
              <span
                className={selectedShift === 2 ? "shift-selected" : ""}
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

        <button
          className="confirm"
          disabled={
            selectedStop === null ||
            selectedDay === null ||
            selectedShift === null
          }
          onClick={() => setShowConfirmModal(true)}
        >
          Выбрать
        </button>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          selectedDay={selectedDay}
          selectedShift={shiftTable[selectedShift]}
          selectedStop={selectedStop}
          reset={reset}
          accept={accept}
          userStops={user.stops}
          shiftTable={shiftTable}
        />
      )}
    </>
  );
};

export default PassengerMain;
