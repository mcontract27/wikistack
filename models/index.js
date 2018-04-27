const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',
    {logging: false});

db.authenticate().then(() => {
    console.log('connected to the database');
  })  

  const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed'),
    }
  });
  
  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isEmail: true }
    }
  });

  Page.beforeValidate((page) => {
      page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      console.log(page.slug);
  });
  
module.exports = { db, Page, User }
