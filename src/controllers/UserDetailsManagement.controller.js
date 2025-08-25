import { getAllUsersService,getUserStatsService } from "../services/UserDetailsManagement.service.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};





export const getUserStatsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const stats = await getUserStatsService(userId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
