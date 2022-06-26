import { FaTrash } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { deleteProject } from "../features/projects/projectsSlice";

interface props {
  id: string;
}

const DeleteProjectButton = ({ id }: props) => {
  const dispatch = useAppDispatch();

  const projectDelete = () => {
    dispatch(deleteProject(id));
  };

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={projectDelete}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
