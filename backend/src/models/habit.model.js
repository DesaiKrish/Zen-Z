import mongoose, {Schema} from "mongoose";

const habitSchema = new Schema({
    habit:{
        type: String,
        required: true,
        trim: true
    },
    goalFreq:{
        type: Number,
        required: true
    },
    goalCounter:{
        type: Number,
        required: true
    },
    progress:{
        type: Number,
        required: true
    },
    goalType:{
        type: String,
        enum: ["daily", "weekly", "monthly"],
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


export const Habit = mongoose.model("Habit", habitSchema)
