import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
  Spin,
} from "antd";
import type { TMovie } from "../../../../../api/types.ts";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import { getMovieDuration, getPosterPath } from "../../utils";
import { useMovieSessions } from "../../hooks/useMovieSessions.tsx";

const { Title, Text, Paragraph } = Typography;

export const Movie = () => {
  const { state, search } = useLocation<{ movie: TMovie }>();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  console.log(id);

  const { sessions, loading } = useMovieSessions({ id });

  return (
    <>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={6}>
          <img
            alt={state?.movie?.title}
            src={getPosterPath(state?.movie?.posterImage)}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>{state?.movie?.title}</Title>
          <Space
            split={<Divider type="vertical" />}
            style={{ margin: "12px 0" }}
          >
            <Text>
              <CalendarOutlined /> {state?.movie?.year}
            </Text>
            <Text>
              <ClockCircleOutlined />{" "}
              {getMovieDuration(state?.movie?.lengthMinutes)}
            </Text>
            <Tag color="gold">★ {state?.movie?.rating}</Tag>
          </Space>

          <Paragraph>{state?.movie?.description}</Paragraph>
        </Col>
      </Row>
      <Divider />
      <Title level={3}>Расписание</Title>
      <Spin spinning={loading} />
      {sessions.map((s) => (
        <Card size="small" key={s.cinemaId} style={{ marginBottom: 12 }}>
          <Row align="middle" justify="space-between">
            <Col>
              <Text strong>{s.cinemaName}</Text>
            </Col>
            <Col>
              <Space>
                {s.times.map((t) => (
                  <Button key={t.id} type="primary" ghost>
                    {t.time}
                  </Button>
                ))}
              </Space>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};
