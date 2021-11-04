const db = require("../models");
const Album = db.albums;
const Op = db.Sequelize.Op;

// Create and Save a new Album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      success: false,
      data: null,
      message: "Content can not be empty!"
    });
  }

  // Create a Album
  const album = {
    title: req.body.title,
    description: req.body.description,
    isBest: req.body.isBest ? req.body.isBest : false
  };

  // Save Album in the database
  Album.create(album)
    .then(data => {
      res.send({success: true, data, message: 'Create successfully'});
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        data: null,
        message:
          err.message || "Some error occurred while creating the Album."
      });
    });
};

// Retrieve all Albums from the database.
exports.findAll = (req, res) => {
  const search = req.query.search;
  const orderBy = req.query.orderBy;
  var condition = search ? 
                          { 
                            [Op.or]: [
                              {title: { [Op.like]: `%${search}%` }},
                              {description: { [Op.like]: `%${search}%` }}
                            ] 
                          } : null;

  Album.findAll({ where: condition, order: [['id', orderBy]], logging: console.log })
    .then(data => {
      res.send({success: true, data, message: 'Create successfully'});
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        data: null,
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};

// Find a single Album with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Album.findByPk(id)
    .then(data => {
      if (data) {
        res.send({success: true, data, message: ''});
      } else {
        res.status(404).send({
          success: false,
          data: null,
          message: `Cannot find Album with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        data: null,
        message: "Error retrieving Album with id=" + id
      });
    });
};

// Update a Album by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Album.update(req.body, {
    where: { id: id }
  })
  .then(async (response) => {
    if(response[0] !== 1) {
      return res.send({
        success: false,
        data: null,
        message: `Cannot update Album with id=${id}. Maybe Album was not found or req.body is empty!`
      });
    }

    try {
      const data = await Album.findByPk(id);
      return res.send({
        success: true,
        data: data,
        message: "Album was updated successfully."
      });
    } catch(error) {
      throw error;
    }
  })
    .catch(err => {
      res.status(500).send({
        success: false,
        data: null,
        message: "Error updating Album with id=" + id
      });
    });
};

// Delete a Album with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Album.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          success: true,
          data: {id},
          message: "Album was deleted successfully!"
        });
      } else {
        res.send({
          success: false,
          data: null,
          message: `Cannot delete Album with id=${id}. Maybe Album was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        data: null,
        message: "Could not delete Album with id=" + id
      });
    });
};

// find all isBest Album
exports.findAllPublished = (req, res) => {
  Album.findAll({ where: { isBest: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};