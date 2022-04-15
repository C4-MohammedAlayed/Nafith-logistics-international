

const connection = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = `SELECT * FROM users INNER JOIN roles ON users.role_id=roles.role_id WHERE email=?`;
  const data = [email];
  connection.query  ( query, data, (err, results) => {
  if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, respons) => {
console.log(respons);
      if (respons) {
        const paylod = {
          userId: results[0].id,
          userName: results[0].userName,
          role: results[0].role_id,
        };

        const secret = process.env.SECRET;

        const token = jwt.sign(paylod, secret);

        return res.status(200).json({
          success: true,
          message: "Valid login credentials",
          token,
         
          role: results[0].role
        
        });
      } else {
        res.status(403).json({
          success: false,
          message: `The password you’ve entered is incorrect`,
          err,
        });
      }
    });
    } else {
      res
        .status(404)
        .json({ success: false, message: "The email doesn't exist", err });
    }
  });
};

module.exports = {
  login,
};
