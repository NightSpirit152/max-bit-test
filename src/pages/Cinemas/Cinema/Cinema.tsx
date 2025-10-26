import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Typography,
  Spin,
  Image,
} from "antd";
import type { TCinema } from "../../../api/types.ts";
import { CalendarOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useCinemaSessions } from "./hooks/useCinemaSessions.tsx";
import { getPosterPath } from "../../Movies/_files/utils";
import queryString from "query-string";

const { Title, Text } = Typography;

export const Cinema = () => {
  const history = useHistory();
  const { state, search } = useLocation<{ cinema: TCinema }>();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  const { sessions, loading } = useCinemaSessions({ id });

  return (
    <CinemaWrapper>
      <Title level={4}>{state?.cinema?.name}</Title>
      <Divider />
      <Spin spinning={loading} />
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {sessions.map((day) => (
          <>
            <Title level={4} style={{ textAlign: "start" }}>
              <CalendarOutlined /> {day.date}
            </Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              {day.movies.map((mov) => (
                <Card key={mov.movieTitle} size="small">
                  <Row align="middle" justify="space-between" wrap={false}>
                    <Image
                      height="100px"
                      src={getPosterPath(mov.posterImage)}
                    />
                    <Col style={{ marginLeft: "20px" }}>
                      <Space>
                        <Text style={{ fontSize: "1rem" }} strong>
                          {mov.movieTitle}
                        </Text>
                      </Space>
                    </Col>
                    <Col flex="auto" style={{ textAlign: "right" }}>
                      <Space size={3} wrap>
                        {mov.sessions.map((s) => (
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
    </CinemaWrapper>
  );
};

const CinemaWrapper = styled.div`
  padding: 15px;
`;
