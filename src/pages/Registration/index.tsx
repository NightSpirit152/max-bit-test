import { Button, Form, Input, Typography } from "antd";
import type { TDefaultResponse, TRegistrationInput } from "../../api/types.ts";
import "./styles.css";
import { useCallback, useState } from "react";
import { apiPost } from "../../api";
import { useHistory } from "react-router-dom";
import { omit } from "lodash";

const Registration = () => {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);

  const handleRegistration = useCallback((values: TRegistrationInput) => {
    apiPost<TRegistrationInput, TDefaultResponse>(
      "/register",
      omit(values, ["_confirmPassword"]),
    ).then((res) => {
      if (res?.message) {
        const newErrors = [];
        newErrors.push(res.message);

        setErrors(newErrors);
      } else {
        history.push({
          pathname: "/login",
          state: { loginData: values },
        });
      }
    });
  }, []);

  return (
    <Form<TRegistrationInput>
      layout="vertical"
      style={{ width: 400, alignSelf: "center", marginTop: 100 }}
      initialValues={{ remember: true }}
      onFinish={handleRegistration}
      autoComplete="off"
    >
      <Typography.Title level={3}>Регистрация</Typography.Title>
      <Form.Item<TRegistrationInput>
        label="Логин"
        name="username"
        rules={[{ required: true, message: "Введите логин" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<TRegistrationInput>
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Введите пароль",
          },
          {
            min: 8,
            message: "Минимум 8 символов",
          },
          {
            pattern: /[A-Z]/,
            message: "Минимум 1 заглавная буква",
          },
          {
            pattern: /\d/,
            message: "Минимум 1 цифра",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<TRegistrationInput>
        label="Подтвердите пароль"
        name="_confirmPassword"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Подтвердите пароль",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароль не совпадает"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.ErrorList errors={errors} />
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Registration;
