const connection = require("../db/db");

const createRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES (?)`;
  connection.query(query, role, (err, resulte) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: `Role created successfully`,
      resulte: resulte,
    });
  });
};

module.exports = createRole;
