/* eslint-disable react/prop-types */
import React from "react";
import LocationIcon from "../../assets/icons/location-icon";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, index , user }) => {
  const navigation = useNavigate();
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 m-4 w-72 h-70 border border-gray-400"
      onClick={() => {
        console.log("in");
        navigation("/project/" + project.id);
      }}
    >
      {/* Fixed width of cards */}
      {/* {index === 0 && user.role !== "contractor" && (
        <div className="bg-red-400 text-white rounded p-2 mb-2 font-semibold text-md">
          {project.newCommentCount ?? 9} Notifiction
        </div>
      )} */}

      {/* Image Section */}
      {project.picture && (
        <div className="w-70">
          <img
            src={project.picture}
            alt={project.name}
            className="w-full h-32 object-cover rounded mb-2" // Adjust height as needed
          />
        </div>
      )}

      <h2 className="text-lg font-bold">{project.name}</h2>
      <p className="text-gray-700 mt-2">{project.description}</p>
      <p className="text-gray-600 mt-1 flex">
        {/* Assuming LocationgrayIcon is defined elsewhere */}
        <LocationIcon /> {project.location}
      </p>
    </div>
  );
};

const GridCardsOfProject = ({ ProjectData , user }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {ProjectData &&
        ProjectData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} user={user} />
        ))}
    </div>
  );
};

export default GridCardsOfProject;
