import UserInfo from "../UserInfo";
import "./driverMain.css";
import { busStops } from "../../data";

const DriverMain = () => {
  return (
    <div className="driverMain">
      <UserInfo />

      <div className="date-selector">
        <span className="active">Сегодня</span>
        <span>Завтра</span>
      </div>

      <div className="stops">
        {busStops.map((stop) => {
          return stop.passengers.length > 0 ? (
            <div className="stop " key={stop.id}>
              <div className="stop-info">
                <p className="stop-name">{stop.name}</p>
                {/* <span>{stop.passengers.length}</span> */}
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
