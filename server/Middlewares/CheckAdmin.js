export const CheckAdmin = (req, res, next) => {
   const user = req.user; // Assuming VerifyToken middleware has set req.user
  if (!user || user.Role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};