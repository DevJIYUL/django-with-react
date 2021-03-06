import React from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";

export default function SuggestionList({ style }) {
  return (
    <div style={style}>
      <Card title="Sugesstions for you" size="small">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  );
}
