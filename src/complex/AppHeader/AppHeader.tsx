import { useMemo, useState } from "react";
import { Layout, Drawer, Button, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { getMenuItems } from "./constants/getMenuItems.tsx";
import { useAuth } from "../../auth/hooks/useAuth.ts";
const { Header } = Layout;

export const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const { isAuth } = useAuth();
  const menuItems = useMemo(() => getMenuItems(isAuth), [isAuth]);

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        icon={<MenuOutlined />}
        style={{ color: "white" }}
        type="text"
        size="large"
        onClick={() => setVisible(true)}
      />
      <Drawer placement="left" onClose={() => setVisible(false)} open={visible}>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          onClick={() => setVisible(false)}
          items={menuItems}
        />
      </Drawer>
    </Header>
  );
};
