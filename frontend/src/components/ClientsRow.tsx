import { FaTrash } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { IClient } from "../features/clients/clientsInterface";
import { deleteClient } from "../features/clients/clientsSlice";

interface props {
  client: IClient;
}

const ClientsRow = ({ client }: props) => {
  const dispatch = useAppDispatch();
  const clientDelete = () => {
    dispatch(deleteClient(client.id));
  };
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={clientDelete}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientsRow;
