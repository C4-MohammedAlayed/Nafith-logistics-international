import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import { BsSearch } from "react-icons/bs";

const Dashboard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [byName, setByName] = useState("");
  const [status, setStatus] = useState(false);

  //Update User
  const [update, setUpdate] = useState(false);
  const [userId, SetUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [elementId, setElementId] = useState([]);
  const [total, setTotal] = useState("");
  const getAllUsers = async () => {
    
    await axios
      .get(`/users`)
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.users);

        setShow(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const getByName = () => {
    axios
      .get(`/users/search?userName=${byName}`)
      .then((res) => {
        setUsers(res.data.user);
      })
      .catch((err) => {
        throw err;
      });
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);

      getAllUsers();
      setStatus(false);
    } catch (error) {
      throw error;
    }
  };

  const updatUser = async (id) => {
    const body = {
      userName,
      email,
    };

    try {
      await axios.put(`/users/${id}`, body);

      getAllUsers();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateClick = (user) => {
    setUpdate(!update);
    SetUserId(user.id);
    setUserName(user.userName);
    setEmail(user.email);
    setElementId([...elementId, user.id]);
    if (update) updatUser(user.id);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handelGet = () => {
    setStatus(true);
    getByName();
  };
  return (
    <div className="main">
      <div className="navigation">
        <span id="logout" onClick={() => navigate("/")}>
          Logout
        </span>
      </div>
      <div className="container">
        <div className="leftCont">
          <Register setUsers={setUsers} setTotal={setTotal} />
        </div>
        <div className="rightCont">
          <div className="search">
            <div className="searchInput">
              <input
                type="text"
                onChange={(e) => {
                  setByName(e.target.value);
                }}
                placeholder="Search"
              />
              <BsSearch
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handelGet();
                }}
              />
              {status && (
                <span
                style={{ cursor: "pointer",marginLeft:"6px",color:'green' }}
                  onClick={() => {
                    getAllUsers();
                  }}
                >
                  getAll
                </span>
              )}
            </div>

            <span>Number of users: {total.length}</span>
          </div>
          <div className="table">
            <div className="tableDiv">
              <table className="insideTable">
                <tr>
                  <th>id</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
                {show &&
                  users.map((user) => {
                    return (
                      <tr key={user.id} className="tr">
                        <td>{user.id}</td>
                        <td>
                          {update && userId === user.id ? (
                            <input
                              type="text"
                              placeholder="UserName"
                              defaultValue={user.userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          ) : (
                            user.userName
                          )}
                        </td>

                        <td>
                          {update && userId === user.id ? (
                            <input
                              type="text"
                              placeholder="email"
                              onChange={(e) => setEmail(e.target.value)}
                              defaultValue={user.email}
                            />
                          ) : (
                            user.email
                          )}
                        </td>

                        <td>
                          {update && userId === user.id ? (
                            <svg
                              onClick={() => {
                                setUpdate(false);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="23"
                              fill="currentColor"
                              class="bi bi-x-circle close"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          ) : (
                            <></>
                          )}

                          <BsPencilSquare
                          style={{ cursor: "pointer" }}
                           
                            onClick={() => handleUpdateClick(user)}
                          />
                          {update && userId === user.id && <></>}

                          <RiDeleteBinLine
                            style={{ cursor: "pointer",color:"red" }}
                            onClick={() => deleteUser(user.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
