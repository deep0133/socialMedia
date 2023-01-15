import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser } from "../Redux/Action/User";
import Loader from "./loader/Loader";
import User from "./User";

export default function Search() {
  const [name, setName] = useState("");
  const [search, setSearching] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { users, loading, error, message } = useSelector(
    (state) => state.allUser
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "ClearUserMessage" });
    }
  }, [alert, dispatch, message, error]);

  const searchHandle = async (e) => {
    e.preventDefault();
    console.log("lenght : " + name.length);
    await dispatch(GetAllUser(localStorage.getItem("token"), name));
    setSearching(true);
  };

  return (
    <>
      <div
        className="h-[92vh]"
        style={{
          background: `linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))`,
        }}>
        <div className="container mx-auto py-8 px-4 lg:w-[60%]">
          <form onSubmit={searchHandle} className="rounded-lg p-6 shadow-md">
            <input
              className="w-full rounded-lg border border-none py-2 px-3 outline-none"
              type="text"
              value={name}
              placeholder="Search..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button
              disabled={name.length > 0 && !loading ? false : true}
              type="submit"
              className="my-2 mx-auto flex rounded-lg bg-blue-500 py-2 px-6 text-white hover:bg-blue-600">
              Search
            </button>
          </form>
          <div>
            <div className="searched-list overflow-hidden border-none px-6 text-center shadow-2xl sm:col-span-4 lg:col-span-3">
              <h2 className="border-b-2 border-pink-500 pt-6  pb-1 text-lg font-medium">
                Results
              </h2>
              {loading ? (
                <div className="py-8">
                  <Loader />
                </div>
              ) : (
                <div className="list relative mt-4 h-full space-y-6 overflow-auto">
                  {search && users && users.length > 0 ? (
                    users.map((usr) => {
                      return usr._id !== users._id ? (
                        <User
                          key={usr._id}
                          name={usr.name}
                          userId={usr._id}
                          image={usr.avatar.url}
                        />
                      ) : null;
                    })
                  ) : (
                    <h3 className="py-5 text-sm font-medium lg:text-lg">
                      {search ? "Nothing Found" : "Search by name"}
                    </h3>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
