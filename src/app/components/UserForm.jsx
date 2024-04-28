import React from "react";
import { useState, useEffect } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({ name: "", email: "" });
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const result = await response.json();

      if (result.success) {
        setUpdateData({ name: "", email: "" });
        setUsers(
          users.map((user) =>
            user.email === result.data.email ? result.data : user
          )
        );
        setIsUpdating(false);
        setUpdateCount(updateCount + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in both name and email fields");
      return;
    }
    console.log(formData);
    e.preventDefault();

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        setFormData({ name: "", email: "" });
        setUsers([...users, result.data]);
        setAddCount(addCount + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = (user) => {
    setUpdateData({ name: user.name, email: user.email });
    setIsUpdating(true);
  };

  return (
    <div>
      <div className="p-3">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            className="p-3 mx-1 rounded-md"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="p-3 mx-1 rounded-md"
          />
          <button type="submit" className="p-3 bg-slate-500 rounded-md">
            Add
          </button>
        </form>

        <table className="m-4 p-4 bg-slate-200 rounded-md">
          <thead>
            <tr>
              <th className="px-2">Name</th>
              <th className="px-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr className="p-2 px-4" key={i}>
                <td className="px-4 py-1 ">{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Update User</h2>
        {isUpdating ? (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={updateData.name}
              onChange={handleUpdateChange}
              placeholder="Enter new name"
              required
            />
            <input
              type="email"
              name="email"
              value={updateData.email}
              onChange={handleUpdateChange}
              placeholder="Enter email"
              required
              readOnly
            />
            <button className="bg-slate-500" type="submit">
              Update
            </button>
            <button type="button" onClick={() => setIsUpdating(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <table className="m-4 p-4 bg-slate-200 rounded-md">
            <thead>
              <tr>
                <th className="px-3">Name</th>
                <th className="px-3">Email</th>
                <th className="px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="py-2">
              {users.map((user) => (
                <tr className="p-2 px-3 my-2 py-2" key={user._id}>
                  <td className="px-1">{user.name}</td>
                  <td className="px-1">{user.email}</td>
                  <td>
                    <button
                      className="px-2 bg-slate-300 rounded-md"
                      onClick={() => handleUpdateClick(user)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-2 bg-zinc-400 p-3 rounded-md">
        <p>Add Count: {addCount}</p>
        <p>Update Count: {updateCount}</p>
      </div>
    </div>
  );
};

export default UserForm;
