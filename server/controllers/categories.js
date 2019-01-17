import Category from '../models/Category';
import Command from '../models/Command';
import { errorResponse, notFoundError } from '../helpers/utils';

const categoriesController = {
  create(req, res) {
    const { name } = req.sanitizedBody;
    return Category.findOne({ name }, (err, foundCategory) => {
      if (err) {
        return errorResponse(res);
      }

      if (foundCategory) {
        return errorResponse(res,
          { statusCode: 422, message: 'Save failed. Category already exists.' });
      }

      return Category({ name }).save((err, category) => {
        if (err) {
          return errorResponse(res,
            { statusCode: 422, message: 'Save failed. There was an error saving this category.' });
        }

        return res.status(201).send({
          success: true,
          message: 'Category saved successfully',
          data: {
            category
          }
        });
      });
    });
  },
  fetchAll(req, res) {
    return Category.find({}, '_id, name', (err, categories) => {
      if (err) {
        return errorResponse(res);
      }

      return res.status(200).send({
        success: true,
        message: 'Categories fetched successfully',
        data: {
          categories
        }
      });
    });
  },
  fetchOne(req, res) {
    const { id } = req.params;

    return Category.findById(id, '_id, name', (err, category) => {
      if (err || !category) {
        return errorResponse(res, notFoundError);
      }

      return res.status(200).send({
        success: true,
        message: 'Category fetched successfully',
        data: {
          category
        }
      });
    });
  },
  update(req, res) {
    const { id } = req.params;
    const { name } = req.sanitizedBody;

    return Category.findById(id, (err, category) => {
      if (err || !category) {
        return errorResponse(res, notFoundError);
      }

      return Category.findOne({ name }, (err, foundCategory) => {
        if (err) {
          return errorResponse(res);
        }

        if (foundCategory && !foundCategory._id.equals(category._id)) {
          return errorResponse(res,
            { statusCode: 422, message: 'Update failed. Category with name already exists.' });
        }

        category.name = name;
        category.save();

        return res.status(200).send({
          success: true,
          message: 'Category updated successfully',
          data: {
            category
          }
        });
      });
    });
  },
  delete(req, res) {
    const { id } = req.params;
    Category.findById(id, (err, category) => {
      if (err || !category) {
        return errorResponse(res, notFoundError);
      }

      Command.find({ category: category._id }, (err, commands) => {
        if (err) {
          return errorResponse(res);
        }

        if (commands.length !== 0) {
          return errorResponse(res,
            { message: 'Category contains children and cannot be deleted', statusCode: 422 });
        }
        return Category.deleteOne({
          _id: id
        }, (err) => {
          if (err) {
            return errorResponse(res);
          }

          return res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
          });
        });
      });
    });
  }
};

export default categoriesController;
