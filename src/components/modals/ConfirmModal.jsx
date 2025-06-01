import "./confirmModal.css";

const ConfirmModal = ({
  setShowConfirmModal,
  selectedDay,
  selectedShift,
  selectedStop,
  reset,
  accept,
}) => {
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
          <div className="selection">
            <span className="label">Остановка:</span>
            <span className="selection_data">{selectedStop.name}</span>
          </div>
          <div className="selection">
            <span className="label">Дата:</span>
            <span className="selection_data">{selectedDay}</span>
          </div>
          <div className="selection">
            <span className="label">Смена:</span>
            <span className="selection_data">{selectedShift}</span>
          </div>
        </div>

        <div className="btns">
          <button className="reject" onClick={reset}>
            Отменить
          </button>
          <button className="accept" onClick={accept}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
