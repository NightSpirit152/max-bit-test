import type { TTicketInfo } from "../types/types.ts";
import { Button, Space, Typography, Statistic } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;
const { Timer } = Statistic;

type TTicketProps = {
  ticket: TTicketInfo;
  handlePay: (id: string) => void;
};

export const Ticket = ({ ticket, handlePay }: TTicketProps) => {
  const { id, movieName, cinemaName, startTime, seats, bookedAt, isPaid } =
    ticket;

  return (
    <Space direction="horizontal" style={{ width: "100%", gap: "50px" }}>
      <Space direction="vertical" align="start">
        <Text strong>{movieName}</Text>
        <Text strong>{cinemaName}</Text>
        <Text strong>{dayjs(startTime).format("DD.MM HH:mm")}</Text>
      </Space>
      <Space direction="vertical">
        {seats?.map(
          (seat) => `Ряд ${seat?.rowNumber}, место ${seat?.seatNumber}`,
        )}
      </Space>
      {!isPaid && (
        <Space direction="horizontal" style={{ gap: "50px" }}>
          <Button
            type="primary"
            ghost
            size="large"
            onClick={() => handlePay(id)}
          >
            Оплатить
          </Button>
          <Timer
            type="countdown"
            format="mm:ss"
            title="Осталось"
            onFinish={() => window.location.reload()}
            value={Date.parse(bookedAt) + 180 * 1000}
          />
        </Space>
      )}
    </Space>
  );
};
