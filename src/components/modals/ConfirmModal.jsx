import { useTime } from "../../hooks/useTime";
import "./confirmModal.css";

const ConfirmModal = ({
  setShowConfirmModal,
  selectedDay,
  selectedShift,
  selectedStop,
  userStops,
  reset,
  accept,
  shiftTable,
}) => {
  const { shortDate } = useTime();
  console.log(userStops);

  const replacedShift = userStops?.filter((stop) => stop.date == selectedDay);

  return (
    <div className="modal">
      <div className="confirmModal_inner">
        <button className="closeBtn" onClick={() => setShowConfirmModal(false)}>
          X
        </button>

        <div className="header">
          <h2>Подтвердите выбор</h2>
        </div>

        <div className="selections">
          <p>
            <span className="text_bubble blue">{selectedShift}</span>,{" "}
            <span className="text_bubble blue">{shortDate(selectedDay)}</span>{" "}
          </p>
          <p className="separator_p">на остановке </p>
          <p>
            <span className="text_bubble blue">{selectedStop.name}</span>
          </p>
        </div>

        {replacedShift.length > 0 && (
          <div className="selections replacement">
            <h4>Будет заменена следующая смена:</h4>
            <p>
              <span className="text_bubble red">
                {shiftTable[replacedShift[0].shift]}
              </span>
              ,{" "}
              <span className="text_bubble red">
                {shortDate(replacedShift[0].date)}
              </span>
            </p>
            <p className="separator_p">на остановке </p>
            <p>
              <span className="text_bubble red">
                {replacedShift[0].stop.name}
              </span>
            </p>

            <div className="notice">!</div>
          </div>
        )}

        <div className="btns">
          <button className="reject" onClick={reset}>
            Отменить
          </button>
          <button
            className="accept"
            onClick={
              replacedShift.length > 0
                ? () => accept(true, replacedShift[0].id)
                : () => accept()
            }
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
