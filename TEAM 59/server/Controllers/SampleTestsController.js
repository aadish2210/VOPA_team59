const SampleTests = require("../Models/SampleTests");
const SampleTest = require("../Models/SampleTests")

module.exports.addSampleTest = async (req, res, next) => {
    try {
        const { lvl, content } = req.body;
        const sample = new SampleTest({ lvl, content });
        await sample.save();
        res
            .status(201)
            .json({
                success: true,
                sample
            });
    } catch (error) {
        console.error(error);
    }
};

module.exports.getSampleTest = async (req, res, next) => {
    try {
        // const { lvl } = req.body;
        const allTest = await SampleTests.find();

        res
            .status(201)
            .json({
                success: true,
                allTest
            });
    } catch (error) {
        console.error(error);
    }
};