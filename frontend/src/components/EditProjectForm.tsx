import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { IProject, statusEnum } from "../features/projects/projectsInterface";
import { updateProject } from "../features/projects/projectsSlice";

interface props {
  project: IProject;
}

const EditProjectForm = ({ project }: props) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("new");
  const [newStatus, setNewStatus] = useState<statusEnum>(
    statusEnum.NOT_STARTED
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "new") {
      setNewStatus(statusEnum.NOT_STARTED);
    } else if (status === "progress") {
      setNewStatus(statusEnum.IN_PROGRESS);
    } else if (status === "completed") {
      setNewStatus(statusEnum.COMPLETED);
    }
  }, [status]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !status) {
      toast.error("Please fill out all fields");
    }

    dispatch(
      updateProject({ status: newStatus, description, name, id: project.id })
    );
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
