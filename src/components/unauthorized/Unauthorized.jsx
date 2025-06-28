import { Link } from "react-router-dom";
import "./unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <p>
        Пассажиры могут просматривать только свою страницу. Пожалуйста,
        вернитесь на страницу <Link to={"/"}>Пассажира</Link>
      </p>
    </div>
  );
};

export default Unauthorized;
