import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../utils/constant";
import toast from "react-hot-toast";
import ActionLogCard from "../../components/ActionLogCard";
import "../../styleSheets/actionlogpage.css";

const ActionLog = () => {
  const [actionLogs, setActionLogs] = useState([]);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/action-logs`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setActionLogs(res.data.logs);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message || "Failed to fetch action logs");
      }
    };
    fetchLogs();
  }, []);
  console.log(actionLogs);
  return (
    <div className="action-log-container">
      {actionLogs.map((actionLog) => (
        <ActionLogCard actionLog={actionLog} key={actionLog._id} />
      ))}
    </div>
  );
};

export default ActionLog;
