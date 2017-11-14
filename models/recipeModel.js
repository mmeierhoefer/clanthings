var mongoose =      require('mongoose');

var recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        required: true,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    time_prep: Number,
    time_cook: Number,
    meal: String,
    ingredients: Array,
    directions: Array
});

module.exports = mongoose.model("Recipe", recipeSchema);
