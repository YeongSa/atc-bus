import { useState } from "react";
import { busStops } from "../../data";
import "./userInfo.css";
import ShiftEditModal from "../modals/ShiftEditModal";
import { useTime } from "../../hooks/useTime";

const UserInfo = ({ stops, shiftTable, deleteShift }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  const { shortDate } = useTime();

  return (
    <div className="userInfo">
      <h2>Ваши смены</h2>

      <div className="user-shifts">
        {stops?.length > 0 ? (
          stops
            .sort((a, b) => a.date - b.date)
            .map((stop) => (
              <div
                className="user-shift"
                key={stop.id}
                onClick={() => {
                  setSelectedStop(stop);
                  setShowEditModal(true);
                }}
              >
                <div className="date">
                  {shortDate(Number(stop.date))} - {shiftTable[stop.shift]}
                </div>

                <div className="user-stop">
                  <p className="user-stop-name">{stop.stop.name}</p>
                  <p>
                    Автобус будет в -
                    {busStops[stop.stopId].times[stop.shift] ? (
                      <span>
                        <span className="user-time crossed">
                          {stop.stop.newTime}
                        </span>
                        <span className="user-time">
                          {busStops[stop.stopId].times[stop.shift]}
                        </span>
                      </span>
                    ) : (
                      <span className="user-time">
                        {stop.times[stop.shift]}
                      </span>
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
  );
};

export default UserInfo;
