import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const { login, register, loading, setLoading, user, logout, isInitialized } =
    useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    role: "PASSENGER",
  });

  const [roleSelectOpen, setRoleSelectOpen] = useState(false);

  if (isInitialized && user && user.role !== "ADMIN") {
    const rolePath = user.role.toLowerCase();
    return <Navigate to={`/${rolePath}`} replace />;
  }

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  const handleChange = (e) => {
    const field = e.target.name;
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleRoleFocus = () => setRoleSelectOpen(true);
  const handleRoleBlur = () => setRoleSelectOpen(false);
  const handleRoleChange = (e) => {
    handleChange(e);
    setRoleSelectOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      navigate("/admin");
    }
  };

  return (
    <div className="register auth-container">
      <div className="auth-form">
        <h2>Регистрация</h2>
        <NavLink to="/admin">Назад</NavLink>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Логин</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group select-group">
            <label htmlFor="role">Роль</label>
            <div className="select-wrapper">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                required
                onFocus={handleRoleFocus}
                onBlur={handleRoleBlur}
              >
                <option value="PASSENGER">Пассажир</option>
                <option value="DRIVER">Водитель</option>
              </select>
              <span className="select-arrow" aria-hidden="true">
                {roleSelectOpen ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12L10 8L14 12"
                      stroke="#a1a1aa"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 8L10 12L14 8"
                      stroke="#a1a1aa"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Фамилия</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Телефон</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Создаем..." : "Регистрация"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
