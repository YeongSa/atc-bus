import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import "./authForm.css";

const AuthForm = () => {
  const { login, register, loading, setLoading, user, logout, isInitialized } =
    useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if (isInitialized && user) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await login(formData);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Вход</h2>
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

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
