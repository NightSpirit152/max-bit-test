import { Button, Space, Typography } from "antd";
import type { TSessionInfo } from "../../../../api/types.ts";
import type { TSelectedSeats } from "../types/types.ts";

const { Text } = Typography;

type TSeatGridProps = {
  sessionInfo: TSessionInfo;
  selected: TSelectedSeats[];
  onChange: (selected: TSelectedSeats[]) => void;
};

export const SeatGrid = ({
  sessionInfo,
  selected,
  onChange,
}: TSeatGridProps) => {
  const {
    bookedSeats,
    seats: { rows, seatsPerRow },
  } = sessionInfo;

  const booked = new Set(
    bookedSeats.map((s) => `${s.rowNumber}-${s.seatNumber}`),
  );

  const selectedSet = new Set(selected.map((s) => `${s.row}-${s.seat}`));

  const toggle = (r: number, s: number) => {
    if (booked.has(`${r}-${s}`)) return;

    const key = `${r}-${s}`;
    const newSelected = selectedSet.has(key)
      ? selected.filter((item) => `${item.row}-${item.seat}` !== key)
      : [...selected, { row: r, seat: s }];

    onChange(newSelected);
  };

  const buttonType = (r: number, s: number) => {
    if (booked.has(`${r}-${s}`)) return "default";
    return selectedSet.has(`${r}-${s}`) ? "primary" : "default";
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", alignItems: "center" }}
      size={8}
    >
      {Array.from({ length: rows }, (_, r) => {
        const row = r + 1;

        return (
          <Space key={row} size={4} wrap={false}>
            <Text style={{ width: 40 }}>Ряд {row}</Text>
            {Array.from({ length: seatsPerRow }, (_, s) => {
              const seat = s + 1;

              return (
                <Button
                  key={seat}
                  size="small"
                  type={buttonType(row, seat)}
                  danger={booked.has(`${row}-${seat}`)}
                  disabled={booked.has(`${row}-${seat}`)}
                  onClick={() => toggle(row, seat)}
                  style={{
                    width: 36,
                    height: 36,
                    padding: 0,
                    background:
                      selectedSet.has(`${row}-${seat}`) &&
                      !booked.has(`${row}-${seat}`)
                        ? "#52c41a"
                        : undefined,
                    borderColor:
                      selectedSet.has(`${row}-${seat}`) &&
                      !booked.has(`${row}-${seat}`)
                        ? "#52c41a"
                        : undefined,
                  }}
                >
                  {seat}
                </Button>
              );
            })}
          </Space>
        );
      })}
    </Space>
  );
};
