// Protected Route
const userVerification = async (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(401).json({ error: "Unauthorized" });
  }
  return;
};

export default userVerification ;