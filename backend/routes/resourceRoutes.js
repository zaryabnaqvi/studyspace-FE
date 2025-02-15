const express = require('express')
const router = express.Router()
const Resource = require('../models/Resource')

const {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource
} = require('../controllers/resourceController')

//? Limit on amount of resources pop up
router.get('/resources', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0
    const resources = await Resource.find()
      .populate('user', 'avatar displayName')
      .limit(limit)
      .sort({ createdAt: -1 }) // Sort by newest first
    res.json(resources)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.route('/')
  .get(getResources)
  .post(createResource)



router.route('/:id')
  .get(getResource)
  .put(updateResource)
  .delete(deleteResource)

//? Get resources for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const resources = await Resource.find({ user: req.params.userId })
      .populate('user', 'avatar displayName')
      .sort({ createdAt: -1 }) // Sort by newest first
    res.json(resources)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
