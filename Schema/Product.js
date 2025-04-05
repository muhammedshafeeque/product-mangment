import joi from "joi";

export const ProductSchema = {
    body: joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    manufacturer: joi.string().required(),
    quantity: joi.number().required(),
    })
};
export const updateProductStatusSchema = {
    body: joi.object({
        status: joi.string().required(),
    })
}
export const updateProductSchema = {
    body: joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        quantity: joi.number().required(),
        description: joi.string().required(),
        manufacturer: joi.string().required(),
        seller: joi.string().required(),
        status: joi.string().required(),
    })
}