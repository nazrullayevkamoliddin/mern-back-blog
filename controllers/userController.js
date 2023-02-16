const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

module.exports = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       return  res.status(400).json(errors.array());
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc = new userModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,
      });

      const user = await doc.save();

      const token = jwt.sign(
        {         
          _id: user._id,
        },
        "secret1234",
        {
          expiresIn: "2h",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({...userData,token,});
    } catch (error) {
      console.log(error);           
      res.json({
        success: false,
        message: "Tizimga kirib bo'lmadi",     
      });
    }
  },

  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: " Noto'g'ri email yoki Parol ",
        });
      }

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash
      );
      if (!isValidPass) {
        return res.status(404).json({
          success: false,
          message: " Noto'g'ri Parol yoki email ",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret1234",
        {
          expiresIn: "2h",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Tizimga kirib bo'lmadi",
      });
    }
  },
  
  getUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          success: "false",
          message: "Foydalanuvchi topilmadi",
        });
      }

      const { passwordHash, ...userData } = user._doc;

      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "Hozircha dostup yoq",
      });
    }
  },
};
