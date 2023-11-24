const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: {
          exclude: [ 'password' ]
        }
      },
      order: [
        [ 'date_created', 'DESC' ]
      ]
    });

    if(!postData.length) {
      res.status(404).json({ message: 'No posts found.' });
      return;
    }

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).json({ posts });
  }
  catch(err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
