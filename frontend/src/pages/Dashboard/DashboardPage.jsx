import React from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const authUser = useSelector((store) => store.auth);
  console.log(authUser);
  return <div>DashboardPage</div>;
};

export default DashboardPage;
