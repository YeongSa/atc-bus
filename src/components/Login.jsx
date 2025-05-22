import "./login.css";

const Login = () => {
  return (
    <div className="login">
      <label htmlFor="login">Логин</label>
      <input type="text" />
      <label htmlFor="password">Пароль</label>
      <input type="text" />
    </div>
  );
};

export default Login;
