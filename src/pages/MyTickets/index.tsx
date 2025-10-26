import { TicketsInfo } from "./_files/components/TicketsInfo.tsx";
import { useMyTickets } from "./_files/hooks/useMyTickets.ts";
import { Spin } from "antd";

const MyTickets = () => {
  const { tickets, loading, handlePay } = useMyTickets();

  return (
    <>
      <Spin spinning={loading} />
      <TicketsInfo tickets={tickets} handlePay={handlePay} />
    </>
  );
};

export default MyTickets;
