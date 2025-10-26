import { Link } from "react-router-dom";

export const getMenuItems = (isAuth: boolean) => [
  {
    key: "movies",
    label: <Link to="/movies">Фильмы</Link>,
  },
  {
    key: "cinemas",
    label: <Link to="/cinemas">Кинотеатры</Link>,
  },
  {
    key: "my-tickets",
    label: <Link to="/my-tickets">Мои билеты</Link>,
  },
  {
    key: "login",
    label: <Link to="/login">{isAuth ? "Выход" : "Вход"}</Link>,
  },
];
