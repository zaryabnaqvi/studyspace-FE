const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['Book','Repository', 'Video','Website', 'Bootcamp', 'Youtube Channel', 'Course', 'Community'],
      message: '{VALUE} is not a valid resource type'
    }
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: {
      values: ['Beginner', 'Intermediate', 'Advanced', 'Everyone'],
      message: '{VALUE} is not a valid level'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  createdBy: {
    type: String,
    required: [true, 'Creator name is required'],
    trim: true
  },
  info: {
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    link: {
      type: String,
      required: [true, 'Link is required'],
      trim: true
    },
    published: {
      type: String,
      required: [false, 'Published date is required']
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Resource', resourceSchema)