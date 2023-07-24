import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/login");
    }

    getUsers();
  }, [nav]);

  const getUsers = async () => {
    const response = await axios.get("https://odd-duck-hoodie.cyclic.app/users", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://odd-duck-hoodie.cyclic.app/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <Link to="add" className="button is-success">
          Add New
        </Link>
        <b
          onClick={() => {
            localStorage.removeItem("token");
            nav("/login");
          }}
        >
          logout
        </b>
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-info is-small mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
