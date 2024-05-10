import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    todo: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    
    }
    
});


export const Todo = mongoose.model('Todo', TodoSchema);


// const topicSchema = new mongoose.Schema(
//   {
//     title: String,
//     description: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

// export default Topic;