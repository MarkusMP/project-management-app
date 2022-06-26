import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProjects } from "../features/projects/projectsSlice";
import ProjectCard from "./ProjectCard";
import Spinner from "./Spinner";

const Projects = () => {
  const dispatch = useAppDispatch();
  const { errorMessage, isError, isLoading, projects, message } =
    useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
    if (message) {
      toast.success(message);
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [message, errorMessage, dispatch]);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Something Went Wrong</p>;

  return (
    <>
      {projects.length > 0 ? (
        <div className="row mt-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
