import mongoose from 'mongoose';

const CategorySchema = {
  name: {
    type: String,
    allowNull: false,
    trim: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
};

const Category = mongoose.model('Category', CategorySchema, 'categories');

export default Category;