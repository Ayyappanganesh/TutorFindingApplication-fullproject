// Import required modules and models
const Tution = require('../models/TutionModel'); // Mongoose model for Tution
const Teacher = require('../models/TeacherModel'); // Mongoose model for Teacher
const { StatusCodes } = require('http-status-codes'); // HTTP status codes for response

// Helper function to check if a value is within a given range of standards
const isWithinRange = (range, value) => {
    // Define the order for standards
    const standardsOrder = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    
    const [start, end] = range;
    
    const startIndex = standardsOrder.indexOf(start);
    const endIndex = standardsOrder.indexOf(end);
    const valueIndex = standardsOrder.indexOf(value);

    return valueIndex >= startIndex && valueIndex <= endIndex;
};

// Function to get tutions with specified conditions
const getTutionsWithCondition = async (req, res) => {
    const { standard, subjects, boards, name, district, state } = req.query;

    const TutionQueryObj = {};
    const TeacherQueryObj = {};

    // Construct the Tution query object
    if (subjects) TutionQueryObj.subjects = subjects;
    if (boards) TutionQueryObj.boards = boards;

    // Construct the Teacher query object
    if (district) TeacherQueryObj.district = district;
    if (state) TeacherQueryObj.state = state;

    try {
        // Query tutions with the given conditions and populate the 'createdBy' field with teacher details
        let Tutions = await Tution.find(TutionQueryObj).populate({
            path: 'createdBy',
            match: TeacherQueryObj, // Filter based on TeacherQueryObj
            select: '-password'
        });

        // Filter tutions based on the standard range if specified
        if (standard) {
            Tutions = Tutions.filter(tution => isWithinRange(tution.standard, standard));
        }

        // Remove tutions where createdBy is null (i.e., no matching teacher) and filter by teacher's name if specified
        Tutions = Tutions.filter(tution => 
            tution.createdBy !== null && 
            (!name || (tution.createdBy.name && tution.createdBy.name.includes(name)))
        );

        // Send a 200 OK response with the filtered tutions
        return res.status(StatusCodes.OK).json({ ResultSet: Tutions });
    } catch (error) {
        // Send a 500 Internal Server Error response if something goes wrong
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// Function to get all tutions created by a specific teacher
const getAllTutions = async (req, res) => {
    const userId = req.body.createdBy;
    const tutions = await Tution.find({ createdBy: userId });
    res.status(StatusCodes.OK).json({ tutions });
};

// Function to create a new tution
const createTution = async (req, res) => {
    const { createdBy } = req.body;
    const teacher = await Teacher.findById(createdBy);
    if (!teacher) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Teacher not found` });
    }

    // Increment the teacher's numOfTutions and save the teacher record
    teacher.numOfTutions += 1;
    await teacher.save();

    // Create a new tution
    const tution = await Tution.create(req.body);
    res.status(StatusCodes.CREATED).json({ tution });
};

const getTution = async(req,res) =>{
    const { id } = req.params
    try {
        const tution = await Tution.findById(id).populate(
            {
                path:'createdBy',
                select:'profilepic state district'
            }
        )
        if(!tution){
            return res.status(StatusCodes.NOT_FOUND).json({message:`No tution with id ${id} exists`})
        }
        return res.status(StatusCodes.OK).json({tution})
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.message})
    }

}

// Function to delete a tution
const deleteTution = async (req, res) => {
    const { body: { createdBy }, params: { id } } = req;
    const teacher = await Teacher.findById(createdBy);
    if (!teacher) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Teacher not found` });
    }

    // Decrement the teacher's numOfTutions and save the teacher record
    teacher.numOfTutions -= 1;
    await teacher.save();

    // Delete the tution and send response
    const tution = await Tution.findOneAndDelete({ createdBy, _id: id });
    if (!tution) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No tution with id ${id} for this teacher` });
    } else {
        return res.status(StatusCodes.OK).json({ message: `Tution with id ${id} deleted successfully` });
    }
};

// Function to update a tution
const updateTution = async (req, res) => {
    const { body: { createdBy }, params: { id } } = req;
    const tution = await Tution.findByIdAndUpdate({ _id: id, createdBy }, req.body, { new: true, runValidators: true });
    if (!tution) {
        res.status(StatusCodes.NOT_FOUND).json({ message: `No tution with id ${id} for this user` });
    } else {
        res.status(StatusCodes.OK).json({ tution });
    }
};

// Export functions to be used in other parts of the application
module.exports = {
    getTution,
    getTutionsWithCondition,
    getAllTutions,
    createTution,
    deleteTution,
    updateTution
};
