const jwt = require("jsonwebtoken");

const authorizeNgo = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (auth) {
      const token = auth.split(" ")[1];

      if (token) {
        await jwt.sign(token, process.env.SECRET, (err, payload)=>{
            if(err){
                res.status(500).json({
                    message: err.message,
                })
            } else{
                req.user = payload
                next()
            }
        })
      } else {
        res.status(500).json({
          message: "You are not authorized to perform this action",
        });
      }
    } else {
      res.status(500).json({
        message: "authorization not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = authorizeNgo