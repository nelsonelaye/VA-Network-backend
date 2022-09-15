const projectModel = require("../model/project");
const ngoModel = require("../model/ngo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();
    res.status(200).json({
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.projectId);
    res.status(200).json({
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, applicationPageLink } = req.body;

    const ngo = await ngoModel.findById(req.params.ngoId);
    if (ngo) {
      const project = new projectModel({
        title,
        description,
        applicationPageLink,
      });

      project.ngo = ngo;
      project.save();

      ngo.projects.push(mongoose.Types.ObjectId(project._id));
      ngo.save();

      res.status(201).json({
        data: project,
      });
    } else {
      res.status(404).json({
        message: "ngo not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const ngo = await ngoModel.findById(req.params.ngoId);
    if (ngo) {
      const project = await projectModel.findByIdAndUpdate(eq.params.projectId);
      if (project) {
        const newProject = new projectModel(req.params.projectId, req.body, {
          new: true,
        });
        ngo.projects.pull(mongoose.Types.ObjectId(project._id));
        ngo.projects.push(mongoose.Types.ObjectId(newProject._id));
        ngo.save();

        res.status(200).json({
          data: newProject,
        });
      } else {
        res.status(404).json({
          message: "project not found",
        });
      }
    } else {
      res.status(404).json({
        message: "ngo not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const ngo = await ngoModel.findById(req.params.ngoId);
    if (ngo) {
      const project = await projectModel.findById(req.params.projectId);
      if (project) {
        await projectModel.findByIdAndDelete(req.params.projectId);

        ngo.projects.pull(mongoose.Types.ObjectId(project._id));
        ngo.save();

        res.status(204).json({
          message: "project deleted",
        });
      } else {
        res.status(404).json({
          message: "project not found",
        });
      }
    } else {
      res.status(404).json({
        message: "ngo not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllProjects,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,
};
