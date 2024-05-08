const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars.reverse());
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  console.log("hell")
  try {
    console.log("Hi")
    console.log(req.body);
    const newcar = new Car(req.body);
    await newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  console.log("edit")
  console.log(req.body)
  try {
    const car = await Car.findOne({ _id: req.body._id });
   
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;
    car.rentPerHour = req.body.rentPerHour;
    car.mileage = req.body.mileage;
    car.year = req.body.year;
    car.carprice = req.body.carprice;

    // await car.findByIdAndUpdate(req.body._id,req.body);

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
