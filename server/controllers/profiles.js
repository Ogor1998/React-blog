const { uploadToCloudinary } = require('../cloudinary')
const User = require('../models/User')


module.exports.profileFind = async (req, res) => {
    const user = await User.findOne({
        username: req.params.username
    });
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    res.json(user)
    // console.log('this is the :', user)
}

module.exports.profileUpdate = async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body }
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer)
        updateData.image = result.secure_url
    }
    const updateduser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    // if (!updateduser) return res.json({ message: "Didn't update" })
    res.json(updateduser)
    console.log(updateduser)
}