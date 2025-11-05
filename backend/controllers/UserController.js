import User from "../models/User.js";

// GET all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -confirmPassword"); // Don't send passwords
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch Users Error:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// DELETE a user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
