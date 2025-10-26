import { Space, Typography, Divider } from "antd";
import type { TTicketInfo } from "../types/types.ts";
import { Ticket } from "./Ticket.tsx";
import dayjs from "dayjs";

const { Title } = Typography;

type TicketsInfoProps = {
  tickets: TTicketInfo[];
  handlePay: (id: string) => void;
};

export const TicketsInfo = ({ tickets, handlePay }: TicketsInfoProps) => {
  const unpayedTickets = tickets.filter((ticket) => !ticket?.isPaid);
  const payedTickets = tickets.filter((ticket) => ticket?.isPaid);
  const expiredTickets = tickets.filter(
    (ticket) => ticket?.isPaid && dayjs(ticket?.startTime) < dayjs(Date.now()),
  );

  return (
    <Space direction="vertical" style={{ margin: 10 }}>
      <Title level={4} style={{ textAlign: "left" }}>
        Неоплаченные
      </Title>
      <Divider />
      {unpayedTickets &&
        unpayedTickets?.map((ticket) => (
          <>
            <Ticket ticket={ticket} handlePay={handlePay} />
            <Divider />
          </>
        ))}
      <Title level={4} style={{ textAlign: "left" }}>
        Оплаченные
      </Title>
      <Divider />
      {payedTickets &&
        payedTickets?.map((ticket) => (
          <>
            <Ticket ticket={ticket} handlePay={handlePay} />
            <Divider />
          </>
        ))}
      <Title level={4} style={{ textAlign: "left" }}>
        Прошедшие
      </Title>
      <Divider />
      {expiredTickets &&
        expiredTickets?.map((ticket) => (
          <>
            <Ticket ticket={ticket} handlePay={handlePay} />
            <Divider />
          </>
        ))}
    </Space>
  );
};
