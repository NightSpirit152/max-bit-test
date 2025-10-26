import type { ColumnsType } from "antd/es/table";
import { Image, Button } from "antd";
import type { TMovie } from "../../../../api/types.ts";
import { getMovieDuration, getPosterPath } from "../utils";

export const getMoviesColumns = ({
  openMovieInfo,
}: {
  openMovieInfo: (id: number, data: TMovie) => void;
}): ColumnsType<TMovie> => [
  {
    title: "",
    dataIndex: "posterImage",
    key: "posterImage",
    align: "center",
    render: (value) => <Image src={getPosterPath(value)} />,
  },
  {
    title: "Название",
    dataIndex: "title",
    key: "title",
    render: (value, data) => `${value} (${data?.year})`,
  },
  {
    title: "Продолжительность",
    dataIndex: "lengthMinutes",
    key: "lengthMinutes",
    render: (value) => getMovieDuration(value),
  },
  {
    title: "Рейтинг",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "",
    dataIndex: "id",
    key: "showMovie",
    align: "center",
    render: (value, data) => (
      <Button type="primary" onClick={() => openMovieInfo(value, data)}>
        Посмотреть сеансы
      </Button>
    ),
  },
];
