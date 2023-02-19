const sequelize = require('../config/connection');
const blogSeeds = require('./blogData')
const userSeeds = require('./userData')
const commentSeeds = require('./commentData')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await userSeeds();
    console.log('\n----- USER DATA SEEDED -----\n');
  
    await blogSeeds();
    console.log('\n----- BLOG DATA SEEDED -----\n');
  
    await commentSeeds();
    console.log('\n----- COMMENt DATA SEEDED -----\n');
  
    process.exit(0);
    
}

seedDatabase();