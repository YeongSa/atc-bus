import { useState } from "react";
import "./admin.css";
import { NavLink } from "react-router-dom";
import apiRequest from "../../utils/apiRequest.js";
import { busStops } from "../../data.js";

const Admin = () => {
  const [users, setUsers] = useState([
    // {
    //   id: 1,
    //   username: "admin",
    //   name: "Admin",
    //   surname: "Admin",
    //   role: "ADMIN",
    //   phone: "-",
    //   createdAt: "25 may",
    // },
    // {
    //   id: 2,
    //   username: "driver",
    //   name: "Driver",
    //   surname: "Driver",
    //   role: "DRIVER",
    //   phone: "+7-981-444-33-11",
    //   createdAt: "26 may",
    // },
    // {
    //   id: 3,
    //   username: "passenger",
    //   name: "Passenger",
    //   surname: "Passenger",
    //   role: "PASSENGER",
    //   phone: "+7-981-444-33-22",
    //   createdAt: "27 may",
    // },
  ]);

  const loadStops = async () => {
    const { data: stops } = await apiRequest.get("/stops/getAll");
    console.log(stops);
  };

  const createStops = async () => {
    const { data: createdBusStops } = await apiRequest.post(
      "/stops/createBusStops",
      busStops
    );

    console.log(createdBusStops);
  };

  return (
    <div className="admin-page">
      <h2>Панель Администратора</h2>

      <div className="dashboard">
        <button className="register-user">
          <NavLink to={"/register"}>
            Зарегистрировать нового пользователя
          </NavLink>
        </button>

        <div className="all-users-wrapper">
          <h3>Все пользователи</h3>

          <div className="all-users">
            {users.map((user) => (
              <div className={`user ${user.role.toLowerCase()}`} key={user.id}>
                <div className="name">
                  <p className="user-field">Имя:</p>
                  <p className="user-value">
                    {user.name} {user.username}
                  </p>
                </div>
                <div className="username">
                  <p className="user-field">Логин:</p>
                  <p className="user-value">{user.username}</p>
                </div>
                <div className="role">
                  <p className="user-field">Роль:</p>
                  <p className="user-value role">{user.role}</p>
                </div>
                <div className="phone">
                  <p className="user-value">{user.phone}</p>
                </div>

                {user.role !== "ADMIN" && <button className="delete">X</button>}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => loadStops()}>Загрузить остановки</button>
        <button onClick={() => createStops()}>Создать остановки</button>
      </div>
    </div>
  );
};

export default Admin;
