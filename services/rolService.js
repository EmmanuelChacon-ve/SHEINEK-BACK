const { getRolAll } = require("../repositories/rolRepository.js");

const getAllRolesService = async () => {
  return await getRolAll();
};

module.exports = { getAllRolesService };
