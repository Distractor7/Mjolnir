// authorizeRole middleware to check if the user is authorized to access the route in the express app backend.
const authorizeRole = (role) => {
  // Return middleware function
  return (req, res, next) => {
    // Check if user is authenticated by checking if req.user role is not equal to role
    if (req.user.role !== role) {
      return res.status(403).send({ error: "Access denied." });
    }
    // If user is authenticated, call next middleware
    next();
  };
};

// Exporting authorizeRole middleware.
module.exports = authorizeRole;
