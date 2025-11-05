// middleware/authenticateToken.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // ✅ This now includes { userId, role }
    console.log("[DEBUG] Authenticated user payload:", req.user);
    next();
  } catch (err) {
    console.error("[ERROR] Token verification failed:", err);
    res.status(403).json({ message: "Invalid token" });
  }
};
