import "./passengerMain.css";
import { useEffect, useRef, useState } from "react";
import UserInfo from "./UserInfo";
import { useTime } from "../../hooks/useTime";
import ConfirmModal from "../modals/ConfirmModal";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { v4 as uuid } from "uuid";
import apiRequest from "../../utils/apiRequest";
import { busStops } from "../../data";

const PassengerMain = () => {
  const isFirstRender = useRef(true);

  const { busStops, shiftTable } = useApp();
  // const { shiftTable } = useApp();
  const { user } = useAuth();

  console.log(user);

  const { today, tomorrow, shortDate } = useTime();
  const [stops, setStops] = useState(
    user.stops.length > 0
      ? user.stops.filter((stop) => {
          // console.log(stop.date >= today);
          return stop.date >= today;
        })
      : []
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedStop, setSelectedStop] = useState(null);
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
      id: uuid(),
      date: String(selectedDay),
      shift: selectedShift,
      stopId: selectedStop.id,
      stop: { name: selectedStop.name },
    };

    if (replaces) {
      setStops((prev) => prev.map((stop) => (stop.id === id ? newStop : stop)));
    } else {
      setStops((prev) => [...prev, newStop]);
    }

    reset();
  };

  const addStops = async () => {
    const { data } = await apiRequest.post("/stops/add", stops);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    addStops();
  }, [stops]);

  const deleteShift = (id) => {
    setStops((prev) => prev.filter((stop) => stop.id !== id));
  };

  const filteredStops = busStops?.filter((stop) =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <UserInfo
        stops={stops}
        shiftTable={shiftTable}
        deleteShift={deleteShift}
      />

      <div className="passenger-main">
        <div className="selection-section">
          <div className="date-container">
            <h2>Выберите смену:</h2>
            <div className="day">
              <div onClick={() => setSelectedDay(today)}>
                <span className={selectedDay === today ? "shift-selected" : ""}>
                  Сегодня
                </span>
                <p>{shortDate(today)}</p>
              </div>
              <div onClick={() => setSelectedDay(tomorrow)}>
                <span
                  className={selectedDay === tomorrow ? "shift-selected" : ""}
                >
                  Завтра
                </span>
                <p>{shortDate(tomorrow)}</p>
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
          {filteredStops?.length > 0 ? (
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
          userStops={stops}
          shiftTable={shiftTable}
        />
      )}
    </>
  );
};

export default PassengerMain;
