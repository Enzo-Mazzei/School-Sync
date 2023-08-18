const express = require('express')
const router = express.Router()
const News = require('../../models/News.model')
const User = require('../../models/User.model')
const Class = require('../../models/Class.model')

router.get('/news', async (req, res) => {
  try {
    const { currentUser } = req.session

    const user = await User.findById(currentUser._id).populate('classes')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const news = await News.find({ classes: { $in: user.classes } })
      .populate('author', 'firstName lastName profilePicture')
      .sort({ date: -1 })

    const existingClasses = await Class.find()

    res.render('pages/dashboard/news', {
      news,
      user,
      existingClasses
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

router.post('/news', async (req, res) => {
  const { currentUser } = req.session
  const { title, content, classes } = req.body

  try {
    const user = await User.findById(currentUser._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const classObjects = await Class.find({ _id: { $in: classes } })

    const classIds = []
    for (const cls of classObjects) {
      classIds.push(cls._id)
    }

    const newNews = await News.create({
      title,
      author: user._id,
      content,
      classes: classIds
    })

    for (const classId of classIds) {
      const classToUpdate = await Class.findById(classId)
      if (classToUpdate) {
        classToUpdate.news.push(newNews._id)
        await classToUpdate.save()
      }
    }

    res.redirect('/dashboard/news')
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

router.post('/news/:newsId', async (req, res) => {
  const newsId = req.params.newsId

  try {
    const news = await News.findById(newsId)

    if (!news) {
      return res.status(404).json({ message: 'News not found' })
    }

    const classIds = news.classes
    for (const classId of classIds) {
      const classToUpdate = await Class.findById(classId)
      if (classToUpdate) {
        classToUpdate.news.pull(newsId)
        await classToUpdate.save()
      }
    }
    await news.deleteOne()
    res.redirect('/dashboard/news')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
