import { CircularProgress } from "@mui/material";
import React from "react";

export default function FullPageLoader() {
  return (
    <div className="full-page-loader flex h-screen w-full items-center justify-center bg-gray-100">
      <CircularProgress />
    </div>
  );
}
