import Command from '../models/Command';
import { errorResponse, isUnauthorised, notFoundError } from '../helpers/utils';

const commandsController = {
  create(req, res) {
    const { snippet, action, category } = req.sanitizedBody;
    return Command.findOne({ snippet }, (err, foundCommand) => {
      if (foundCommand) {
        return errorResponse(res,
          { statusCode: 422, message: 'Save failed. Command with this snippet already exists.' });
      }

      const newCommand = Command({
        snippet,
        action,
        category,
        user: req.auth._id
      });

      return newCommand.save((err, command) => {
        if (err) {
          return errorResponse(res,
            { statusCode: 422, message: 'Save failed. There was an error saving this command.' });
        }

        return res.status(201).send({
          success: true,
          message: 'Command saved successfully',
          data: {
            command
          }
        });
      });
    });
  },
  fetchAll(req, res) {
    const match = {};
    Command.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$category',
          commands: {
            $push: '$$ROOT'
          },
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$category', 0] }, '$$ROOT'] } }
      },
      { $project: { category: 0, __v: 0 } }
    ])
      .exec((err, categories) => {
        if (err) {
          return errorResponse(res);
        }

        return res.status(200).send({
          success: true,
          message: 'Commands with categories fetched successfully',
          data: {
            categories
          }
        });
      });
  },
  fetchOne(req, res) {
    const { id } = req.params;

    return Command.findById(id)
      .populate('category')
      .exec((err, command) => {
        if (err || !command) {
          return errorResponse(res, notFoundError);
        }

        return res.status(200).send({
          success: true,
          message: 'Command fetched successfully',
          data: {
            command
          }
        });
      });
  },
  update(req, res) {
    const { command } = req;
    const {
      snippet, action, category
    } = req.sanitizedBody;

    return Command.findOne({ snippet }, (err, foundCommand) => {
      if (err) {
        return errorResponse(res);
      }

      if (foundCommand && !foundCommand._id.equals(command._id)) {
        return errorResponse(res,
          { statusCode: 422, message: 'Update failed. Command with snippet already exists.' });
      }

      command.snippet = snippet || command.snippet;
      command.action = action || command.action;
      command.category = category || command.category;
      command.save();

      return res.status(200).send({
        success: true,
        message: 'Command updated successfully',
        data: {
          command
        }
      });
    });
  },
  delete(req, res) {
    return Command.deleteOne({
      _id: req.command._id
    }, (err) => {
      if (err) {
        return errorResponse(res);
      }

      return res.status(200).send({
        success: true,
        message: 'Command deleted successfully'
      });
    });
  }
};

export default commandsController;
