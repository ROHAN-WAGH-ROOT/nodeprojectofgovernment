const { default: mongoose } = require("mongoose");
const path = require("path");
const messages = require("../constants/messages");
const authoritiesSchema = require("../Model/authoritiesModel");
const { authoritiesValidation } = require('../validation/authorityValidation');


const getAuthorities = async (req, res) => {
    try {
        const authorities = await authoritiesSchema.find();
        res.status(200).json({ ...messages.RECORD_FOUND, authorities });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ...messages.SERVER_ERROR })
    }
}



const getAuthority = async (req, res) => {
    try {
        let id = req.params.id;
        const authorities = await authoritiesSchema.findById(id);
        res.status(200).json({ ...messages.RECORD_FOUND, authorities });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ...messages.SERVER_ERROR })
    }
}

const updatdeAuthority = async (req, res) => {
    try {
        let id = req.params.id;
        let params = req.body;
        const createdAuthority = await authoritiesValidation.validateAsync(req.body);
        if (createdAuthority) {
            const authorities = await authoritiesSchema.findByIdAndUpdate(id, { $set: createdAuthority })
            return res.status(200).json({ ...messages.RECORD_UPDATED, authorities });
        }
        res.send("not Updated");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ...messages.SERVER_ERROR, error })
    }
}

const deleteAuthority = async (req, res) => {
    try {
        let id = req.params.id;
        const authorities = await authoritiesSchema.findByIdAndDelete(id)
        res.status(200).json({ ...messages.RECORD_DELETE, authorities });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ...messages.SERVER_ERROR })
    }
}

const addAuthorities = async (req, res) => {
    try {
        const createdAuthority = await authoritiesValidation.validateAsync(req.body);
        if (createdAuthority) {
            const result = await authoritiesSchema.create({ ...req.body, address: { city: req.city, taluka: req.taluka, district: req.district, pincode: req.pincode }, userId: req.user.id, image: req.files[0].path });
            uploadPath = path.join(req.files[0].path) //'../expressImage/' + req.files.path
            return res.status(201).json({ ...messages.RECORD_CREATED, result })
        }
        res.send("not created");
    } catch (error) {
        console.log(error);
        res.status(500).json({ ...messages.SERVER_ERROR, error })
    }
}

module.exports = {
    getAuthorities,
    addAuthorities,
    getAuthority,
    deleteAuthority,
    updatdeAuthority,
}