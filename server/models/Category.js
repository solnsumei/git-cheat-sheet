import mongoose from 'mongoose';

const CategorySchema = {
  name: {
    type: String,
    allowNull: false,
    trim: true,
  }
};

const Category = mongoose.model('Category', CategorySchema, 'categories');

export default Category;
