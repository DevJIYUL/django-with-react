import React from "react";
import { Input, Menu } from "antd";
import "./AppLayout.scss";
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";
import { InstagramOutlined } from "@ant-design/icons";
function AppLayout({ children }) {
  console.log("!!!!!!!!!", children);
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <InstagramOutlined />
          instagram
        </h1>
        <div className="search">
          <Input.Search />
        </div>
        <div className="topnav">
          <Menu mode="horizontal">
            <Menu.Item>메뉴1</Menu.Item>
            <Menu.Item>메뉴2</Menu.Item>
            <Menu.Item>메뉴3</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="contents">{children}</div>
      <div className="sidebar">
        <StoryList style={{ marginBottom: "1rem" }} />
        <SuggestionList />
      </div>
      <div className="footer">&copy; 2020.Jul</div>
    </div>
  );
}

export default AppLayout;
