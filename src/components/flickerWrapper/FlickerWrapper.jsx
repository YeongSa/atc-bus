import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const FlickerWrapper = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return user ? (
    <div className="flickerWrapper">{children}</div>
  ) : (
    () => navigate("/login")
  );
};

export default FlickerWrapper;
