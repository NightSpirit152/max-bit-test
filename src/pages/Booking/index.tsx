import { Button, Space, Spin, Typography } from "antd";
import type { TSessionInfo } from "../../api/types.ts";
import { useLocation } from "react-router-dom";
import { useBookingInfo } from "./_files/hooks/useBookingInfo.ts";
import { SeatGrid } from "./_files/components/SeatGrid.tsx";
import { useState } from "react";
import type { TSelectedSeats } from "./_files/types/types.ts";
import { map } from "lodash";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const Booking = () => {
  const [selected, setSelected] = useState<TSelectedSeats[]>([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");

  const { sessionInfo, movie, cinema, handleBookSeats, errors, loading } =
    useBookingInfo(id);

  return (
    <Space direction="vertical" style={{ gap: "15px" }}>
      <Title level={4}>Выбор места</Title>
      <Space direction="vertical" style={{ textAlign: "left" }}>
        <Text strong>Фильм: {movie?.title}</Text>
        <Text strong>Кинотеатр: {cinema?.name}</Text>
        <Text strong>
          Время: {dayjs(sessionInfo?.startTime).format("DD.MM, HH:mm")}
        </Text>
      </Space>
      {sessionInfo && (
        <SeatGrid
          sessionInfo={sessionInfo as TSessionInfo}
          selected={selected}
          onChange={setSelected}
        />
      )}
      <Button
        type="primary"
        onClick={() => handleBookSeats(selected)}
        size="middle"
      >
        Забронировать
      </Button>
      {errors && map(errors, (error) => <Text type="danger">{error}</Text>)}
      <Spin spinning={loading} />
    </Space>
  );
};

export default Booking;
