const Task = require('../models/Task');

const createTask = async (req, res) => {
    const {title, description, status} = req.body;
    try {
        const task = await Task.create({
            title,
            description,
            status,
            user: req.user._id
        });
        res.status(201).json({
            message: "Task Created SuccessFully",
            task
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error while creating new task."
        })
    }
}

const getTasks = async (req, res) => {
    
    try {
        const tasks = await Task.find({
            user: req.user._id,
        });
        res.status(201).json({
            message: "Task Data Fetched Successfully!",
            taskData: tasks,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error in getting Tasks!",
        })
    }

}

const updateTask = async (req, res) => {
    const {id} = req.params;
    const {title, description, status} = req.body;

    try {
        //find task with matching _id and userId
        const task = await Task.findOneAndUpdate(
            {_id:id, user: req.user._id},
            {title, description, status},
            {new: true}
        );

        if(!task){
            return res.status(404).json({
                message: "Task Not Found",
            });
        }

        res.status(201).json({
            message: "Task Updated Successfully",
            taskData: task
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error In updating Task"
        })
    }
}

const deleteTask = async (req, res) => {
    const {id} = req.params;
    
    try {
        const task = await Task.findOneAndDelete({
            _id: id,
            user: req.user._id
        });

        if(!task){
            return res.status(404).json({
                message: "Task not Found"
            });
        }

        res.json({
            message: "Task Deleted Successfully",
            deletedTask: task,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error in Deleting Task",
        })
    }
}

module.exports = {createTask, getTasks, updateTask, deleteTask};