const db = require("../models");

module.exports = function(app) {
  app.get("/api/workouts", function(req, res) {
    db.Workout.find({}).then(function(data) {
      let newData = []
      for(let i = 0;i<data.length;i++){
        let element = {
          totalDuration:data[i].exercises.map(element=>{
          return element.duration
        }).reduce((a,b) => a + b, 0),
        _id:data[i]._id,
        day:data[i].day,
        exercises:data[i].exercises
      }
        newData.push(element)
      }
      res.json(newData);
    });
  });
  app.get("/api/workouts/range",   function(req, res) {
    let x = new Date().setDate(new Date().getDate()-7)
    db.Workout.find({day:{$gte: x}}).then(function(data) {
      console.log(data)
      res.json(data);
    });
  })

  app.put("/api/workouts/:id", function(req, res) {
    db.Workout.updateOne({ _id: req.params.id }, {$push:{ exercises: req.body}}).then(function(data) {
      res.json(data);
    });
  });
  app.post("/api/workouts",   function(req, res) {
    db.Workout.create(req.body).then(function(data) {
      res.json(data);
    });
  })
};

