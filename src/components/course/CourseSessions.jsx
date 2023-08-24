import { useEffect, useState } from "react";
import api from "../../api";

export default function CourseSessions({ courseId }) {
  const [sessions, setSessions] = useState(null);
  useEffect(() => {
    const fetchCourseSections = async () => {
      try {
        const response = await api.get(
          `api/Session/GetCourseSessions/${courseId}`
        );

        setSessions(response.data);
      } catch (error) {
        console.log(error);
      }

      fetchCourseSections();
    };
  }, [courseId]);

  return (
    <div className="table-container">
      {sessions ? (
        <div>
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>Address</th>
                <th>Date</th>
                <th>Time</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={session.sessionId}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{index}</p>
                        <p className="text-muted mb-0">{session.address}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{session.date}</p>
                    <p className="text-muted mb-0">{session.time}</p>
                  </td>
                  <td>
                    {/* <span className="badge badge-success rounded-pill d-inline">
                      {compareDates(session.date, session.)
                        ? "Completed ✅"
                        : "Pending 🕒"}
                    </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No sessions available</h1>
      )}
      <button className="button-submit button-list">Create</button>
    </div>
  );
}
