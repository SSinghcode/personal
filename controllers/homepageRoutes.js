const router = require('express').Router();
const { User,Indoor,Outdoor } = require('../models');
const withAuth = require('../util/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('index', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// router.get('/', async (req, res) => {
//   //TODO: Add a comment describing the purpose of the render method
//     res.render('index');
//   });

  router.get('/activities', async (req, res) => {
    console.log('activities')
    //TODO: Add a comment describing the purpose of the render method
    try {
      const userData = await User.findAll();
      let users = userData.map((user) => user.get({plain:true}));
      const indoorData = await Indoor.findAll();
      let indoors=indoorData.map((user) => user.get({plain:true}));
      const outdoorData = await Outdoor.findAll();
      let outdoors = outdoorData.map((user) => user.get({plain:true}));

      res.render('activities', {users,indoors,outdoors})
    } catch (err) {
      res.status(500).json(err);
    }

      // res.render('activities');
    });

    router.get('/final', async (req, res) => {
      //TODO: Add a comment describing the purpose of the render method
        res.render('final');
      });
      
    
module.exports = router;
