import "./userInfo.css";

const UserInfo = () => {
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="user-info">
      <div className="date">
        <p>Сегодня:</p>
        <span>{currentDate}</span>
      </div>
    </div>
  );
};

export default UserInfo;
