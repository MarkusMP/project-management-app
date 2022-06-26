import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import Spinner from "../components/Spinner";
import { getClient } from "../features/clients/clientsSlice";
import { getProject } from "../features/projects/projectsSlice";

const Project = () => {
  const { id } = useParams();
  const { isLoading, isError, errorMessage, project, message } = useAppSelector(
    (state) => state.projects
  );
  const { client } = useAppSelector((state) => state.clients);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!project || project.id !== id) {
      dispatch(getProject(id as string));
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (message === "Successfully deleted project") {
      navigate("/");
    }
  }, [dispatch, id, errorMessage, message, navigate, project]);

  useEffect(() => {
    if (project) {
      dispatch(getClient(project.clientId));
    }
  }, [project, dispatch]);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Something Went Wrong</p>;

  return (
    <>
      {project && client && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{project.name}</h1>
          <p>{project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{project.status}</p>

          <ClientInfo client={client} />

          <EditProjectForm project={project} />

          <DeleteProjectButton id={project.id} />
        </div>
      )}
    </>
  );
};

export default Project;
