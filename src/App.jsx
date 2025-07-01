import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import PassengerMain from "./components/passenger/PassengerMain";
import DriverMain from "./components/driver/DriverMain";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthForm from "./components/auth/AuthForm";
import ProtectedRoute from "./utils/ProtectedRoute";
import Unauthorized from "./components/unauthorized/Unauthorized";
import LoadingSpinner from "./components/LoadingSpinner";
import Register from "./components/auth/Register";
import Admin from "./components/admin/Admin";

const DefaultRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const rolePath = user.role.toLowerCase();
  return <Navigate to={`/${rolePath}`} replace />;
};

const AppContent = () => {
  const { user, loading, isInitialized, logout } = useAuth();

  if (loading || !isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <header>
        <h1>ATCBUS - Demo 0.2</h1>
        <p>Просмотр от лица</p>
        <NavLink to="/passenger">Пассажира</NavLink>
        <NavLink to="/driver">Водителя</NavLink>
        {user && user.role === "ADMIN" && <NavLink to="/admin">Админа</NavLink>}
        {user && (
          <button className="logoutBtn" onClick={logout}>
            Выйти
          </button>
        )}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<DefaultRoute />} /> */
          <Route path="/login" element={<AuthForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/passenger" element={<PassengerMain />} />
          </Route>
          <Route
            element={<ProtectedRoute requiredRole={["DRIVER", "ADMIN"]} />}
          >
            <Route path="/driver" element={<DriverMain />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole={"ADMIN"} />}>
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
