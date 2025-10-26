import { useHistory, useLocation } from "react-router-dom";
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
import type { TMovie } from "../../../api/types.ts";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import { getMovieDuration, getPosterPath } from "../_files/utils";
import { useMovieSessions } from "./hooks/useMovieSessions.tsx";
import styled from "styled-components";
import queryString from "query-string";

const { Title, Text, Paragraph } = Typography;

export const Movie = () => {
  const history = useHistory();
  const { state, search } = useLocation<{ movie: TMovie }>();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  const { sessions, loading } = useMovieSessions({ id });

  return (
    <MovieWrapper>
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
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {sessions.map((day) => (
          <>
            <Title level={4} style={{ textAlign: "start" }}>
              <CalendarOutlined /> {day.date}
            </Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              {day.cinemas.map((cin) => (
                <Card key={cin.cinemaId} size="small">
                  <Row align="middle" justify="space-between" wrap={false}>
                    <Col>
                      <Space>
                        <Text style={{ fontSize: "1rem" }} strong>
                          {cin.cinemaName}
                        </Text>
                      </Space>
                    </Col>
                    <Col flex="auto" style={{ textAlign: "right" }}>
                      <Space size={4} wrap>
                        {cin.sessions.map((s) => (
                          <Button
                            key={s.id}
                            type="primary"
                            ghost
                            size="large"
                            onClick={() => {
                              history.push({
                                pathname: "/booking",
                                search: queryString.stringify({
                                  id: s.id,
                                }),
                              });
                            }}
                          >
                            {s.time}
                          </Button>
                        ))}
                      </Space>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          </>
        ))}
      </Space>
    </MovieWrapper>
  );
};

const MovieWrapper = styled.div`
  padding: 15px;
`;
