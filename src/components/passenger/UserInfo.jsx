import { useState } from "react";
import { busStopsActual } from "../../data";
import "./userInfo.css";
import ShiftEditModal from "../modals/ShiftEditModal";

const UserInfo = ({ user, shiftTable, deleteShift }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  return user ? (
    <div className="userInfo">
      <h2>Ваши смены</h2>

      <div className="user-shifts">
        {user.stops.length > 0 ? (
          user.stops.map((stop) => (
            <div
              className="user-shift"
              key={stop.id}
              onClick={() => {
                setSelectedStop(stop);
                setShowEditModal(true);
              }}
            >
              <div className="date">
                {stop.date} - {shiftTable[stop.shift]}
              </div>

              <div className="user-stop">
                <p className="user-stop-name">{stop.stopName}</p>
                <p>
                  Автобус будет в -{" "}
                  {busStopsActual[stop.stopId].timeChanged[stop.shift] ? (
                    <span>
                      <span className="user-time crossed">
                        {stop.busExpectedTime}
                      </span>
                      <span className="user-time">
                        {busStopsActual[stop.stopId].timeChanged[stop.shift]}
                      </span>
                    </span>
                  ) : (
                    <span className="user-time">{stop.busExpectedTime}</span>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <i>Смены еще не выбраны</i>
        )}
      </div>

      {showEditModal && (
        <ShiftEditModal
          setShowEditModal={setShowEditModal}
          selectedStop={selectedStop}
          shiftTable={shiftTable}
          deleteShift={deleteShift}
        />
      )}
    </div>
  ) : (
    <i>Загружаем...</i>
  );
};

export default UserInfo;
