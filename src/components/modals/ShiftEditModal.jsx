import { useTime } from "../../hooks/useTime";
import "./shiftEditModal.css";

const ShiftEditModal = ({
  setShowEditModal,
  selectedStop,
  shiftTable,
  deleteShift,
}) => {
  const { shortDate } = useTime();

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

        {/* <div className="selections">
          <div className="selection">
            <span className="label">Остановка:</span>
            <span className="selection_data">{selectedStop.stopName}</span>
          </div>
          <div className="selection">
            <span className="label">Дата:</span>
            <span className="selection_data">{selectedStop.date.short}</span>
          </div>
          <div className="selection">
            <span className="label">Смена:</span>
            <span className="selection_data">
              {shiftTable[selectedStop.shift]}
            </span>
          </div>
        </div> */}

        <div className="selections">
          <p>
            <span className="text_bubble grey">
              {shiftTable[selectedStop.shift]}
            </span>
            ,{" "}
            <span className="text_bubble grey">
              {shortDate(Number(selectedStop.date))}
            </span>{" "}
          </p>
          <p className="separator_p">на остановке </p>
          <p>
            <span className="text_bubble grey">{selectedStop.stop.name}</span>
          </p>
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
