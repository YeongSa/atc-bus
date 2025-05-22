import "./userInfo.css";

const UserInfo = () => {
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentUser = "Иван Иванович";

  return (
    <div className="user-info">
      <div className="date">
        <p>Текущая дата:</p>
        <span>{currentDate}</span>
      </div>

      <div className="user">
        <p>Пользователь:</p>
        <span>{currentUser}</span>
      </div>
    </div>
  );
};

export default UserInfo;
