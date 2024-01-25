require('dotenv').config();
require('./config/database');

const PromoCode = require('./models/promoCode');

const promoCodesData = [
  { code: 'SAVE10', discount: 10 },
  { code: 'SAVE20', discount: 20 },
  { code: 'SAVE30', discount: 30 },
];

// Function to seed the database
async function seedDatabase() {
    try {
      // Clear existing promo codes
      await PromoCode.deleteMany({});
  
      // Insert new promo codes
      await PromoCode.create({ code: 'SAVE10', discount: 10 });
      await PromoCode.create({ code: 'SAVE20', discount: 20 });
      await PromoCode.create({ code: 'SAVE30', discount: 30 });
  
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      // Close the database connection
      process.exit;
    }
  }
  
  // Run the seeding function
  seedDatabase();