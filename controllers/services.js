const mongoose = require('mongoose');
const serviceSchema = require('../Model/services');
const { serviceValidation } = require('../validation/servicesValidation');
const path = require("path");
const messages = require('../constants/messages');

const getServices = async (req, res) => {
    try {
        const authorityId = req.query.authorityId;
        if (authorityId) {
            if (!mongoose.isValidObjectId(authorityId)) {
                return res.status(400).json({ ...messages.BAD_REQUEST, authorityId })
            }
            const services = await serviceSchema.find({ authorityId: mongoose.Types.ObjectId(authorityId) });
            res.status(200).json({ ...messages.RECORD_FOUND, services })
        } else {
            const services = await serviceSchema.find();
            res.status(200).json({ ...messages.RECORD_FOUND, services })
        }
    } catch (error) {
        res.status(500).json({ ...messages.SERVER_ERROR, error })
    }
}

const getService = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await serviceSchema.findById(id);
        res.status(200).json({ ...messages.RECORD_FOUND, service })
    } catch (error) {
        res.status(500).json({ ...messages.SERVER_ERROR, error })
    }
}

const addService = async (req, res) => {
    try {
        let authorityId = mongoose.Types.ObjectId(req.body.authorityId)
        const service = await serviceSchema.findOne({ name: req.body.name })
        const result = serviceValidation.validateAsync(req.body);
        if (service && result) {
            return res.status(400).json({ ...messages.ALREADY_EXIST });
        } else {
            if (result) {
                const requiredDocuments = {
                    documentName: req.body.documentName,
                    copies: req.body.copies,
                    isXerox: req.body.radiogroup
                }
                const createService = await serviceSchema.create({ ...req.body, image: req.files[0].path, requiredDocuments: requiredDocuments });
                uploadPath = path.join(req.files[0].path) //'../expressImage/' + req.files.path
                return res.status(200).json({ ...messages.RECORD_CREATED, createService, image: uploadPath }) //uploadPath
            }
        }
        res.status(500).json({ ...messages.SERVER_ERROR })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ...messages.SERVER_ERROR, error })
    }
}

const updateService = async (req, res) => {
    try {
        const id = req.params.id;
        const bodyData = req.body;
        const result = serviceValidation.validateAsync(req.body);
        if (result) {
            const update = await serviceSchema.findByIdAndUpdate(id, { $set: [bodyData.name, bodyData.providedAuthorities, bodyData.type, bodyData.higerAuthority, bodyData.price, bodyData.estimatedTime, bodyData.requiredDocuments.documentName, bodyData.requiredDocuments.copies, bodyData.requiredDocuments.isXerox, bodyData.description, bodyData.preRequisites] });
            return res.status(200).json({ ...messages.RECORD_UPDATED, update })
        }
        res.status(500).json({ ...messages.RECORD_NOT_FOUND })
    } catch (error) {
        res.status(500).json({ ...messages.SERVER_ERROR, error })
    }
}

const deleteService = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await serviceSchema.findByIdAndDelete(id);
        res.status(200).json({ ...messages.RECORD_DELETE, deleted })
    } catch (error) {
        res.status(500).json({ ...messages.SERVER_ERROR, error })
    }
}

module.exports = {
    addService,
    getService,
    getServices,
    updateService,
    deleteService
}