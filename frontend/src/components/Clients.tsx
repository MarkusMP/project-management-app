import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getClients } from "../features/clients/clientsSlice";
import ClientsRow from "./ClientsRow";

const Clients = () => {
  const dispatch = useAppDispatch();
  const { isLoading, clients, message, errorMessage } = useAppSelector(
    (state) => state.clients
  );

  useEffect(() => {
    dispatch(getClients());

    if (message) {
      toast.success(message);
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [dispatch, message, errorMessage]);

  return (
    <>
      {!isLoading && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <ClientsRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;
