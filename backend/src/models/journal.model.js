import mongoose, {Schema} from "mongoose";

const journalSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    jEntries:[
        {
            "chapter": {
                type: String,
                required: true
            },
            "content": {
                type: String,
                required: true
            },
            "date": {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

journalSchema.pre("save", async function (next) {
    this.date = new Date();
    next();
});


export const Journal = mongoose.model("Journal", journalSchema)