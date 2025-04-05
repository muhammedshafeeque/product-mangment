import { MANUFACTURES } from "../Models/ManufactureModals..js";
import { queryGen } from "../Services/Utils.js";

export const getManufactures=async(req,res,next)=>{
    try {
        let query = req.query;
        const { keywords, skip, limit } = await queryGen(query);
        
        const skipValue = skip ? parseInt(skip) : 0;
        const limitValue = limit ? parseInt(limit) : 10;
        
        let manufactures = await MANUFACTURES.find(keywords).skip(skipValue).limit(limitValue);
        let count = await MANUFACTURES.countDocuments(keywords);
        res.status(200).json({ results: manufactures, count });
    } catch (error) {
        next(error)
    }
}

export const createManufacture=async(req,res,next)=>{
    try {
        let manufacture = await MANUFACTURES.create(req.body);
        res.status(201).json(manufacture);
    } catch (error) {
        next(error)
    }
}