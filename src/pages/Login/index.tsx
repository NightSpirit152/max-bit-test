import { Button, Form, Input, Typography } from "antd";
import type { TLoginInput, TLoginResponse } from "../../api/types.ts";
import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { apiPost } from "../../api";
import { Link, useHistory, useLocation } from "react-router-dom";
import { REGISTRATION_ROUTES } from "../Registration/routes.tsx";
import { useAuth } from "../../auth/hooks/useAuth.ts";

const Login = () => {
  const history = useHistory();
  const { logout, isAuth } = useAuth();
  const { state } = useLocation<{ loginData: TLoginInput }>();
  const { login } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin = useCallback((values: TLoginInput) => {
    apiPost<TLoginInput, TLoginResponse>("/login", values).then((res) => {
      if (res?.message) {
        const newErrors = [];
        newErrors.push(res.message);

        setErrors(newErrors);
      } else {
        if (res?.token) {
          login(res?.token);
          history.push({ pathname: "/my-tickets" });
        }
      }
    });
  }, []);

  useEffect(() => {
    if (isAuth) {
      logout();
      history.push({ pathname: "/movies" });
    }
  }, []);

  return (
    <Form<TLoginInput>
      layout="vertical"
      style={{ width: 400, alignSelf: "center", marginTop: 100 }}
      initialValues={state?.loginData}
      onFinish={handleLogin}
      autoComplete="off"
    >
      <Typography.Title level={3}>Вход</Typography.Title>
      <Form.Item<TLoginInput>
        label="Логин"
        name="username"
        rules={[{ required: true, message: "Введите логин" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<TLoginInput>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.ErrorList helpStatus="error" errors={errors} />
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
      <Typography.Text>
        Если у вас нет аккаунта{" "}
        <Link to={REGISTRATION_ROUTES.url}>зарегистрируйтесь</Link>
      </Typography.Text>
    </Form>
  );
};

export default Login;
