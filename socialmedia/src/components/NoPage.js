import { ErrorOutlineSharp } from "@mui/icons-material";
import React from "react";

export default function NoPage() {
  return (
    <div
      style={{
        background: `linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))`,
      }}
      className="flex h-[92vh] items-center justify-center">
      <div className="skew-x-6 text-center transition">
        <ErrorOutlineSharp />{" "}
        <h1 className="text-4xl font-medium">404 NOT FOUND</h1>
        <p className="mt-1 text-lg font-light">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
