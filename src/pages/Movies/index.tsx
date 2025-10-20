import { Table } from "antd";
import { useMoviesTableConfig } from "./_files/hooks/useMoviesTableConfig.tsx";

const Movies = () => {
  const config = useMoviesTableConfig();

  return <Table {...config} />;
};

export default Movies;
