import type { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import type { TCinema } from "../../../../api/types.ts";

export const getCinemasColumns = ({
  openCinemaSessions,
}: {
  openCinemaSessions: (cinemaId: number, data: TCinema) => void;
}): ColumnsType<TCinema> => [
  {
    title: "Кинотеатр",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "",
    dataIndex: "id",
    key: "showCinemaSessions",
    align: "center",
    render: (value, data) => (
      <Button type="primary" onClick={() => openCinemaSessions(value, data)}>
        Посмотреть сеансы
      </Button>
    ),
  },
];
