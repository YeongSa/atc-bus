import "./shiftEditModal.css";

const ShiftEditModal = ({
  setShowEditModal,
  selectedStop,
  shiftTable,
  deleteShift,
}) => {
  const handleDelete = () => {
    deleteShift(selectedStop.id);
    setShowEditModal(false);
  };

  return (
    <div className="modal">
      <div className="confirmModal_inner">
        <button className="closeBtn" onClick={() => setShowEditModal(false)}>
          X
        </button>

        <div className="header">
          <h2>Удалить смену?</h2>
        </div>

        <div className="selections">
          <div className="selection">
            <span className="label">Остановка:</span>
            <span className="selection_data">{selectedStop.stopName}</span>
          </div>
          <div className="selection">
            <span className="label">Дата:</span>
            <span className="selection_data">{selectedStop.date}</span>
          </div>
          <div className="selection">
            <span className="label">Смена:</span>
            <span className="selection_data">
              {shiftTable[selectedStop.shift]}
            </span>
          </div>
        </div>
        <div className="btns">
          <button className="reject" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftEditModal;
