const StudentModel = require("../Models/StudentModel")

module.exports.getStudent = async (req, res, next) => {
    try {
        const { studentClass } = req.body;
        const allStudent = await StudentModel.find({ studentClass });
        // console.log(allStudent)

        res
            .status(201)
            .json({
                success: true,
                allStudent
            });
    } catch (error) {
        console.error(error);
    }
};

module.exports.addStudent = async (req, res, next) => {
    try {
        const { name, roll, studentClass } = req.body;
        const student = await StudentModel.findOne({ roll, studentClass });
        if (student) {
            return res.json({ message: "Student already exists with this roll" });
        }
        const std = await StudentModel.create({ name, roll, studentClass });
        res
            .status(201)
            .json({
                success: true,
                std
            });
    } catch (error) {
        console.error(error);
    }
};
module.exports.submitTest = async (req, res, next) => {
    try {
        const { _id, lvl } = req.body;

        // Validate the provided _id
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const student = await StudentModel.findOne({ _id });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Add the new test to the student's test array
        student.test.push({ level: lvl });

        // Save the updated student document
        await student.save();

        res.status(201).json({
            success: true,
            student
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};