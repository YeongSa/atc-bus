import "./userInfo.css";

const UserInfo = () => {
  const shifts = true;

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
    <div className="userInfo">
      <h2>Ваши смены</h2>

      <div className="user-shifts">
        {shifts ? (
          <>
            <div className="user-shift">
              <div className="date">{today} - Утро</div>

              <div className="user-stop">
                <p className="user-stop-name">«32-й мкр. ул. 30 лет Победы»</p>
                <p>
                  Автобус будет в -
                  <span>
                    <span className="user-time">05:25</span>
                    <span className="user-new-time">05:35</span>
                  </span>
                </p>
              </div>
            </div>

            <div className="user-shift">
              <div className="date">{getTomorrow()} - День</div>

              <div className="user-stop">
                <p className="user-stop-name">«32-й мкр. ул. 30 лет Победы»</p>
                <p>
                  Автобус будет в -
                  <span>
                    <span className="user-new-time">12:17</span>
                    {/* <span className="user-new-time">05:35</span> */}
                  </span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>
            <i>Смены еще не выбраны</i>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
