const { getAllRolesService } = require("../services/rolService.js");

const getRolesController = async (req, res) => {
  try {
    const roles = await getAllRolesService();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};

module.exports = { getRolesController };
