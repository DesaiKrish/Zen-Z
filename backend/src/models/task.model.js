import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
    task:{
        type: String,
        required: true,
        trim: true
    },
    dueDate:{
        type: Date,
        required: true
    },
    priority:{
        type: String,
        required: true,
        enum: ["high","medium","low"]
    },
    status:{
        type: String,
        required: true,
        enum: ["pending","completed"]
    },
    completionDate:{
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    }
)


export const Task = mongoose.model("Task", taskSchema)
