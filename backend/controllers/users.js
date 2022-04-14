const connecting = require("../db/db");
const bcrypt = require("bcryptjs");
const salt = 8;

// createUsers function
const createUsers = async (req, res) => {
  const { userName, email, passWord, role_id } = req.body;
  let encrypted;
  if (passWord) {
    encrypted = await bcrypt.hash(passWord, salt);
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

const getAllUsers=(req,res)=>{
    const query =`SELECT * FROM users WHERE is_deleted = 0`

    connecting.query(query,(err,results)=>{
        if (err) {
            return res.status(500).json({
                success:false,
                massage:"server error",
                err:err
            })
        }

        res.status(200).json({
            success:true,
            massage:"All users",
            users:results
        })
    })
}

module.exports = {
  createUsers,
  getAllUsers
};
