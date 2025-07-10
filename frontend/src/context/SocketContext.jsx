import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../redux/slices/authSlice";
import { useContext } from "react";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const authUser = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?.id) {
      const socket = io(`${import.meta.env.VITE_BACKEND_API_URL}`, {
        query: {
          userId: authUser?.id,
        },
      });

      socket.on("connect", () => {
        setSocket(socket);
      });

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }
  }, [authUser, dispatch]);
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
