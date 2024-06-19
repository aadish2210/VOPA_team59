const mongoose = require("mongoose");

const SampleTest = new mongoose.Schema({
    lvl: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});


// const SampleTest = mongoose.model("SampleTest", sampleTestsSchema);

// SampleTest.insertMany([
//     {
//         lvl: 1,
//         content: "A  B  C  D  E  F"
//     },
//     {
//         lvl: 2,
//         content: "Apple Ball Cat Dog Elephant"
//     },
//     {
//         lvl: 3,
//         content: "The is a demo sentence and i hope you can read it."
//     },
//     {
//         lvl: 4,
//         content: "This is a sample story. It is a wonderfull story. I would love to write more stories of this kind."
//     },
//     {
//         lvl: 1,
//         content: "U  V  W  X  Y  Z"
//     }
// ]);


module.exports = mongoose.model("SampleTests",SampleTest );