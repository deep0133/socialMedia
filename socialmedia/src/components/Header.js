import {
  AccountBox,
  AccountBoxOutlined,
  Add,
  AddOutlined,
  Home,
  HomeOutlined,
  Search,
  SearchOutlined,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ active, setActive }) {
  return (
    <>
      <div className="w-full overflow-auto">
        <div
          className="header sticky top-0 z-10 box-border flex h-[8vh] min-w-[300px] items-center justify-center [filter:drop-shadow(20px_-44px_88px_red)]"
          style={{
            background: `linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))`,
          }}>
          <ul className="flex basis-[70%] items-center justify-center space-x-[2.5rem] sm:space-x-24 md:space-x-32">
            <li className="icon home">
              <Link
                to="/"
                onClick={() => {
                  setActive("/");
                }}>
                {active == "/" ? <Home color="primary" /> : <HomeOutlined />}
              </Link>
            </li>
            <li className="icon upload">
              <Link
                to={"/upload"}
                onClick={() => {
                  setActive("/upload");
                }}>
                {active === "/upload" ? (
                  <Add color="primary" />
                ) : (
                  <AddOutlined />
                )}
              </Link>
            </li>
            <li className="icon search">
              <Link
                to={"/search"}
                onClick={() => {
                  setActive("/search");
                }}>
                {active == "/search" ? (
                  <Search color="primary" />
                ) : (
                  <SearchOutlined />
                )}
              </Link>
            </li>
            <li className="icon profile">
              <Link
                to={"/account"}
                onClick={() => {
                  setActive("/account");
                }}>
                {active === "/account" ? (
                  <AccountBox color="primary" />
                ) : (
                  <AccountBoxOutlined />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
