import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { DeleteAllEntries } from "../DeleteAllEntries/DeleteAllEntries";
import { DeleteAllMarkedEntries } from "../DeleteAllMarkedEntries/DeleteAllMarkedEntries";

export default function BasicButtonGroup({ setLoading, count }) {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button style={{ backgroundColor: "#499cc1" }}>{count}</Button>
      <Button
        style={{ backgroundColor: "#499cc1" }}
        onClick={() => DeleteAllMarkedEntries(setLoading)}
        disabled={count <= 0} // Отключаем кнопку, если count <= 0
      >
        Remote checked
      </Button>
      <Button
        style={{ backgroundColor: "#499cc1" }}
        onClick={() => DeleteAllEntries(setLoading)}
        disabled={count <= 0} // Отключаем кнопку, если count <= 0
      >
        Remote all
      </Button>
    </ButtonGroup>
  );
}
