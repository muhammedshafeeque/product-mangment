import { COLLECTIONS } from "../Constants/Collections.js";
import { ORDERS } from "../Models/odersModal.js";
import { PRODUCTS } from "../Models/productModals.js";
import { queryGen } from "../Services/Utils.js";

export const createOrder = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await PRODUCTS.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (product.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Product quantity is not enough" });
    }
    if (product.status !== "instock") {
      return res.status(400).json({ message: "Product not available" });
    }
    
    let totalPrice = product.price * quantity;
    const order = await ORDERS.create({
      product: productId,
      quantity,
      totalPrice,
      customer: req.profile._id,
      createdBy: req.profile._id,
      updatedBy: req.profile._id,
    });
    product.quantity -= quantity;
    await product.save();
    res.status(200).json({ message: "Order created successfully", order });
  } catch (error) {
    next(error);
  }
};
export const getOrders = async (req, res, next) => {
  try {
    let { keywords, skip, limit } = await queryGen(req.query);
    let skipValue = skip ? parseInt(skip) : 0;
    let limitValue = limit ? parseInt(limit) : 10;

    const orders = await ORDERS.find(keywords)
      .sort({ createdAt: -1 })
      .populate("product")
      .populate("customer")
      .populate("createdBy")
      .populate("updatedBy")
      .populate({
        path: "product",
        populate: {
          path: "manufacture",
          model: COLLECTIONS.MANUFACTURES,
        },
      })
      .populate({
        path: "product",
        populate: {
          path: "seller",
          model: COLLECTIONS.SELLERS,
        },
      })
      .skip(skipValue)
      .limit(limitValue);
    let results = orders.map((order) => {
      return {
        _id: order._id,
        product: order.product.name,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        createdBy: order.createdBy.name,
        updatedBy: order.updatedBy.name,
        customer: order.customer.name,
        seller: order.product.seller.name,
        manufacturer: order.product.manufacture.name,
      };
    });
    let count = await ORDERS.countDocuments(keywords);
    res.status(200).json({ results, count });
  } catch (error) {
    next(error);
  }
};

export const mostOrderedProducts = async (req, res, next) => {
  try {
    const products = await ORDERS.aggregate([
      {
        $group: {
          _id: "$product",
          orderCount: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          totalRevenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: COLLECTIONS.PRODUCTS,
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: COLLECTIONS.MANUFACTURES,
          localField: "productDetails.manufacture",
          foreignField: "_id",
          as: "manufacturer"
        }
      },
      { $unwind: "$manufacturer" },
      {
        $project: {
          _id: 1,
          name: "$productDetails.name",
          price: "$productDetails.price",
          description: "$productDetails.description",
          manufacturer: "$manufacturer.name",
          orderCount: 1,
          totalQuantity: 1,
          totalRevenue: 1,
          status: "$productDetails.status"
        }
      }
    ]);
    
    res.status(200).json({ 
      success: true,
      count: products.length,
      results: products 
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthlyOrderStats = async (req, res, next) => {
  try {
    const orders = await ORDERS.find().sort({ createdAt: -1 });
    const monthlyStats = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; 
      const key = `${year}-${month}`;
      
      if (!monthlyStats[key]) {
        monthlyStats[key] = {
          year,
          month,
          monthName: date.toLocaleString('default', { month: 'long' }),
          totalOrders: 0,
          totalRevenue: 0,
          totalQuantity: 0
        };
      }
      
      monthlyStats[key].totalOrders += 1;
      monthlyStats[key].totalRevenue += order.totalPrice;
      monthlyStats[key].totalQuantity += order.quantity;
    });
    const results = Object.values(monthlyStats).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

    res.status(200).json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    next(error);
  }
};

