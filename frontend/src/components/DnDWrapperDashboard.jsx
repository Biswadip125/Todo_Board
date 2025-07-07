import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DashboardPage from "../pages/Dashboard/DashboardPage";

const DnDWrapperDashboard = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DashboardPage />
    </DndProvider>
  );
};

export default DnDWrapperDashboard;
