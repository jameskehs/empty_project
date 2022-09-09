import "./Users.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const { data } = await axios.get("/api/users/all");
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllUsers();
  }, []);
  return (
    <>
      <table id="all-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Owned Sites</th>
            <th>Superuser</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.userid}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="user-sites">
                  {user.sites.map((site) => {
                    return (
                      <a key={site.siteid} href={`/site/${site.siteid}`}>
                        {site.name}
                      </a>
                    );
                  })}
                </td>
                <td>{user.superuser ? "Y" : "N"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
