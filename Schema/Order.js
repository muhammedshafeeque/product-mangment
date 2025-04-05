import joi from "joi";

export const OrderSchema ={
    body:joi.object({
        productId:joi.string().required(),
        quantity:joi.number().required(),
    })
}
