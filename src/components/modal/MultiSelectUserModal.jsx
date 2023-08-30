import { useEffect, useState } from "react";
import styles from "./MultiSelectUserModal.module.css";
import api from "../../api";
import Select from "react-select";
export default function MultiSelectUserModal({
  requestEndpoint,
  handleSubmit,
  setIsOpen,
}) {
  const [list, setList] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await api.get(`${requestEndpoint}`);
        if (response) {
          const options = response.data.map((user) => ({
            value: user.userId,
            label: `${user.firstName} ${user.lastName}`,
          }));
          setList(options);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [requestEndpoint]);

  const handleClick = () => {
    setIsOpen(false);
    handleSubmit(selectedOptions);
  };

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            ✖
          </button>
          <div className={styles.modalContent}>
            <h2>Select users</h2>
            {
              <Select
                isMulti
                name="users"
                options={list}
                value={selectedOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectChange}
              />
            }
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className="button-submit"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button className="button-submit" onClick={() => handleClick()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
