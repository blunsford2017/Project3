const Task = require('../models/task');

// set up module.exports and set up new action
module.exports = {
    new:newTask,
    create,
    index,
    edit,
    update,
    delete: deleteTask,
};

// define new action
function newTask(req, res){
    res.render('tasks/new');
};

// define create new action
function create(req, res) {
    // create task object
    const task = new Task(req.body);

    task.save(function(err) {
        try {console.log(task)}
        // after task created redirect
        catch (err) {
          res.json({ err });
        }
    });
};

// define seeing all tasks
function index(req, res) {
    // querery model for all tasks
    Task.find({}, function(err, tasks) {
        // render template for all habit
        res.json(tasks);
    });
};

// update a task
function edit(req, res) {
    Task.findById(req.params.id, function(err, task) {
      // Verify task is "owned" by logged in user
      if (!task.user.equals(req.user._id)) return res.
      res.json(task);
    });
}

function update (req, res) {
  Task.findByIdAndUpdate(req.params.id, req.body, function(err, task){
    res.json(task);
  } )
}

// Delete task
function deleteTask(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Task.findByIdAndDelete(req.params.id, function(err, task) {
      // Find the task subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const taskSubdoc = tasks.tasks.id(req.params.id);
      // Ensure that the task was created by the logged in user
      if (!taskSubdoc.userId.equals(req.user._id)) return res.json(tasks._id);
      // Remove the task using the remove method of the subdoc
      // habitSubdoc.remove();
      // Save the updated tasks
      tasks.save(function(err) {
        // Redirect back to the tasks's show view
        res.json(tasks);
      });
    });
  }
