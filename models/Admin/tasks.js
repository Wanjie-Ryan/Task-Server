const mongoose = require('mongoose')



const taskSchema = new mongoose.Schema({

    project:{

      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true,

    },

    name:{

        type:String,
        required:[true, 'name of task must be provided']
    },

    description:{

        type:String,
        required:[true, 'description of task must be provided']
    },

    deadline:{

        type:Date,
        required:[true, 'deadline date of the task must be provided']
    },

    status:{
        type: String,
      enum: ["pending", "complete"],
      default: "Pending",
      required: [true, "Status of Project is required"],
    },

    assign:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Assignee is required']
    }


},{timestamps:true})


module.exports = mongoose.model('Task', taskSchema)
