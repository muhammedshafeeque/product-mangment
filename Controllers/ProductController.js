import { MANUFACTURES } from "../Models/ManufactureModals..js";
import { PRODUCTS } from "../Models/productModals.js";
import { SELLERS } from "../Models/SellerModal.js";
import { queryGen } from "../Services/Utils.js";


export const getProducts = async (req, res, next) => {
    try {
        let query = req.query;
        const { keywords, skip, limit } = await queryGen(query);

        const skipValue = skip ? parseInt(skip) : 0;
        const limitValue = limit ? parseInt(limit) : 10;
        
        const products = await PRODUCTS.find(keywords ).skip(skipValue).limit(limitValue).populate("manufacture").populate("seller").populate("createdBy").populate("updatedBy");
        let results = products.map(product=>{
            return {
                _id:product._id,
                name:product.name,
                price:product.price,
                description:product.description,
                manufacturer:product.manufacture.name,
                seller:product.seller.name,
                createdBy:product.createdBy.name,
                updatedBy:product.updatedBy.name,
                status:product.status,
                quantity:product.quantity,
            }
        })
        let count = await PRODUCTS.countDocuments(keywords);
        res.status(200).json({results,count});
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        let sellerId = await SELLERS.findOne({ profile: req.profile._id });
        let manufacture=await MANUFACTURES.findById(req.body.manufacturer)
        if(!manufacture){
            res.status(400).send({message:"manufacturer not found"})
        }
        const product = await PRODUCTS.create({ ...req.body, manufacture: manufacture._id,seller:sellerId._id,createdBy:req.profile._id,updatedBy:req.profile._id });

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }

};

export const updateProduct = async (req, res, next) => {
    try {
        req.body.updatedBy = req.profile._id;
        let product = await PRODUCTS.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!product){
            res.status(404).send({message:"product not found"})
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}