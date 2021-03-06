const connecting = require("../db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// createUsers function
const createUsers = async (req, res) => {
  const { userName, email, password, role_id } = req.body;
  let encrypted;
  if (password) {
    encrypted = await bcrypt.hash(password, saltRounds);
  }
  const query = `INSERT INTO users (userName,email,password,role_id) VALUES(?,?,?,?)`;
  const data = [userName, email, encrypted, role_id];
  connecting.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "created successfully",
      result: result,
    });
  });
};

const getAllUsers = (req, res) => {
  const query = `SELECT * FROM users WHERE is_deleted = 0`;

  connecting.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: "All users",
      users: results,
    });
  });
};

const getUserByName = (req, res) => {

    
  const query = `SELECT * FROM users WHERE userName= ? AND is_deleted = 0 `;
  userName =req.query.userName
  connecting.query(query,userName, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      user: result,
    });
  });
};

const updateUserById = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const query = `UPDATE users SET ? WHERE id=? AND is_deleted=0 `;
  data = [body, id];

  connecting.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        massage: "User not found",
        err: err,
      });
    }
    res.status(202).json({
      success: true,
      massage: "Updated successfully",
      result: result,
    });
  });
};

const deleteUserById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE users SET is_deleted=1 WHERE id=?`;
  connecting.query(query, id, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "User not found",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Succeeded to delete the user",
      result: result,
    });
  });
};

module.exports = {
  createUsers,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserByName,
};
