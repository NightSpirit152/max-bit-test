import { Table } from "antd";
import { useCinemasTableConfig } from "./_files/hooks/useCinemasTableConfig.tsx";

const Cinemas = () => {
  const config = useCinemasTableConfig();

  return <Table {...config} />;
};

export default Cinemas;
