

// models/Product.js
// 定义产品的数据结构（Schema）和数据库模型（Model）

const mongoose = require('mongoose');

// ─── 1. 定义 Schema（数据结构） ───────────────────────────────
const productSchema = new mongoose.Schema(
  {
    // 产品名称，字符串，必填
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,  // 自动去除首尾空格
    },

    // 产品描述，字符串，可选
    description: {
      type: String,
      trim: true,
    },

    // 价格，数字，必填，最小值为 0
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },

    // 类别，字符串，必填
    // 例如: "Consoles", "Games", "Accessories"
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
  },
  {
    // 自动添加 createdAt 和 updatedAt 两个时间字段
    timestamps: true,
  }
);

// ─── 2. 创建 Model ────────────────────────────────────────────
const Product = mongoose.model('Product', productSchema);

module.exports = Product;