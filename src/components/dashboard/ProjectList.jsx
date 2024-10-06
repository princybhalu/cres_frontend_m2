import React, { useEffect, useState } from "react";
import PlusIcon from "../../assets/icons/plus-icon";
import { DEBOUNCE_TIME } from "../../utils/constants";
import { getProjectListForDashboard } from "../../services/api/project";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PLATFORM_USERS } from "../../utils/enums";
import GridCardsOfProject from "./GridCardsOfProject";
import SearchIcon from '../../assets/icons/searchIcon';

const ProjectList = () => {
  const [searchString, setSearchString] = useState("");
  const [debounceSearchQuery, setDebounceSearchQuery] = useState(null);
  const [currentlyAppliedFilter, setCurrentlyAppliedFilter] = useState({
    filter: null,
    search: null,
  });
  const [ProjectDetails, setProjectDetails] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  /**
   * @method handleSearchInput
   * @param e
   * @description this function is used to handle search for the card view or list view
   */
  const handleSearchInput = (e) => {
    const { value } = e.target;
    const objectiveSearchValue = value.trim();
    setSearchString(value);

    if (debounceSearchQuery !== null) {
      clearTimeout(debounceSearchQuery);
    }

    setDebounceSearchQuery(
      setTimeout(() => {
        if (objectiveSearchValue.length > 0) {
          setCurrentlyAppliedFilter({
            ...currentlyAppliedFilter,
            search: value,
          });
        } else {
          setCurrentlyAppliedFilter({
            ...currentlyAppliedFilter,
            search: value,
          });
        }
      }, DEBOUNCE_TIME)
    );
  };

  const OnClickOnAddOfProject = () => {
    navigate("/project/add");
  };

  //   API CALLES
  const getProjectList = async () => {
    try {
      const { data: ProjectDetails } = await getProjectListForDashboard(
        currentlyAppliedFilter
      );
      console.log("ProjectDetails : ", ProjectDetails);

      setProjectDetails(ProjectDetails);
    } catch (err) {
      console.log("error in geting project list");
      console.log(err);
    }
  };

  //   useeffects
  useEffect(() => {
    getProjectList().then();
  }, []);

  return (
    <>
      {/* Add Project Section */}
      <div className="p-2 flex flex-col md:flex-row justify-end items-center max-w-[1280px] mx-auto">
        <div className="flex">
          <div className="flex border border-gray-300 mx-2 px-1 ">
            <SearchIcon style={`my-auto `} />
            <input
              value={searchString}
              type="text"
              placeholder="Search"
              className="p-1 my-auto focus:border-none focus:outline-none w-full sm:w-1/2"
              onChange={handleSearchInput}
            />
          </div>

          {user && user.role === PLATFORM_USERS.OFFICER && (
            <>
              <button
                className="text-[#ffffff] bg-[#446ca5] px-4 py-1 rounded mr-4 flex"
                onClick={OnClickOnAddOfProject}
              >
                <span className="mr-2">
                  <PlusIcon />
                </span>
                Add
              </button>
            </>
          )}
        </div>
      </div>

      {/* List of Project */}
      <GridCardsOfProject ProjectData={ProjectDetails} user={user} />
    </>
  );
};

export default ProjectList;
