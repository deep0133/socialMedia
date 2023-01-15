import { Translate } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <div className="relative flex h-[90vh] items-center justify-center">
      <CircularProgress />
    </div>
  );
}
