import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LoadUser } from "./Redux/Action/User";
import UploadPost from "./components/UploadPost";
import Account from "./components/Account";
import { useAlert } from "react-alert";
import Profile from "./components/Profile";
import NoPage from "./components/NoPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Search from "./components/Search";
import Home from "./components/Home";

function App() {
  // background color of login and signing page:
  //linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))
  const [active, setActive] = useState(window.location.pathname);

  const { isAuthenticated, message, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (localStorage.key("token") !== undefined) {
      dispatch(LoadUser(localStorage.getItem("token")));
    }
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "ClearUserMessage" });
    }
    if (error) {
      dispatch({ type: "ClearUserError" });
    }
  }, [alert, dispatch, message, error]);

  return (
    <Router>
      {isAuthenticated && <Header active={active} setActive={setActive} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadPost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account setActive={setActive} />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
