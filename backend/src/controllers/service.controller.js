const {
  selectAllServicesByUser,
  insertServiceByUser,
} = require("../models/service.model");

const getAllServicesByUser = async (request, response) => {
  try {
    const services = await selectAllServicesByUser(request.user.id);
    if (!services.length)
      return response
        .status(404)
        .json({ status: false, message: "No services found" });
    return response.status(200).json({ status: true, services });
  } catch (err) {
    console.error(`Get all services by user failed ${err}`);
    return response.status(500).json({ status: false, message: err.message });
  }
};

const postService = async (request, response) => {
  try {
    const { name, description } = request.body;
    if (!name)
      return response
        .status(400)
        .json({ status: false, message: "Name is required" });

    const service = await insertServiceByUser(
      name,
      description,
      request.user.role === "admin" ? request.user.id : null,
    );

    return response.status(201).json({ status: true, service });
  } catch (err) {
    console.error(`Create service failed ${err}`);
    return response.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { getAllServicesByUser, postService };
