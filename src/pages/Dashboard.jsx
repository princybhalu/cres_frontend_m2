import React from "react";
import { useSelector } from "react-redux";
import {PLATFORM_USERS} from "../utils/enums";
import ProjectList from "../components/dashboard/ProjectList";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  
  if (!user) return <></>;


  return (
    <>
      {/* Chart section */}
      {user.role === PLATFORM_USERS.OFFICER && (
        <>
          <div className="container mx-auto bg-[var(--take-lighter)] mt-4 p-4 w-full h-[324px]">
            <div className="text-lg font-semibold ">Total Sites </div>
          </div>
        </>
      )}

      {/* display list */}
      <ProjectList />

      {/* <DateRangePickerComp /> */}
    </>
  );
};

export default Dashboard;