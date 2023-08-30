const mongoose = require('mongoose')



const taskSchema = new mongoose.Schema({

    project:{
        
    }

})


module.exports = mongoose.model('Task', taskSchema)
