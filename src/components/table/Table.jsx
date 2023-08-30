import { useEffect, useState } from "react";
import api from "../../api";
import DeleteModal from "../modal/DeleteModal";

export default function Table({
  id,
  endpoint,
  headers,
  rows,
  handleCreateFunction,
  handleRowClick,
  handleDeleteFunction,
}) {
  const [list, setList] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await api.get(`api${endpoint}`);
        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchList();
  }, [endpoint]);

  const handleShowModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  return (
    <div className="table-container">
      {isOpen && (
        <DeleteModal
          id={selectedId}
          handleDeleteFunction={handleDeleteFunction}
          setIsOpen={setIsOpen}
        />
      )}
      {list ? (
        <div>
          <table className="table bg-white table-hover table-responsive-sm">
            <thead className="bg-light">
              <tr>
                <th scope="col">#</th>
                {headers.map((header, index) => (
                  <th key={index} scope="col">
                    {header.label}
                  </th>
                ))}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, itemIndex) => (
                //item[rows[0]] is the id of the list item
                <tr
                  key={itemIndex}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    //check if the clicked element is the "X" cell
                    if (e.target.textContent === "❌") {
                      handleShowModal(item[rows[0]]);
                    } else {
                      // Handle row click (open details page)
                      handleRowClick(item[rows[0]]);
                    }
                  }}
                >
                  <th scope="row">{itemIndex + 1}</th>
                  {headers.map((header, index) => (
                    <td key={index}>{item[header.key]}</td>
                  ))}
                  <td>❌</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No Data available</h1>
      )}
      <button
        className="button-submit button-list"
        onClick={handleCreateFunction}
      >
        Create
      </button>
    </div>
  );
}
