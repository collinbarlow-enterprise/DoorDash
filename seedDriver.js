require('dotenv').config();
require('./config/database');

const Driver = require('./models/driver');

const driverData = [
    {
        firstName: 'John',
        lastName: 'Doe',
        picture: 'not available',
        car: {
          make: 'Toyota',
          model: 'Camry',
          year: 2018
        },
        rating: [4, 5, 4]
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        picture: 'not available',
        car: {
          make: 'Honda',
          model: 'Civic',
          year: 2020
        },
        rating: [3, 4, 5]
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        picture: 'not available',
        car: {
          make: 'Ford',
          model: 'Escape',
          year: 2019
        },
        rating: [5, 4, 5]
      },
      {
        firstName: 'Bob',
        lastName: 'Williams',
        picture: 'not available',
        car: {
          make: 'Chevrolet',
          model: 'Malibu',
          year: 2022
        },
        rating: [4, 3, 4]
      },
      {
        firstName: 'Eva',
        lastName: 'Davis',
        picture: 'not available',
        car: {
          make: 'Nissan',
          model: 'Altima',
          year: 2017
        },
        rating: [5, 5, 4]
      },
      {
        firstName: 'Michael',
        lastName: 'Smith',
        picture: 'not available',
        car: {
          make: 'Honda',
          model: 'Accord',
          year: 2021
        },
        rating: [3, 4, 3]
      },
      {
        firstName: 'Olivia',
        lastName: 'Clark',
        picture: 'not available',
        car: {
          make: 'Subaru',
          model: 'Outback',
          year: 2020
        },
        rating: [4, 5, 5]
      },
      {
        firstName: 'Daniel',
        lastName: 'Lee',
        picture: 'not available',
        car: {
          make: 'Hyundai',
          model: 'Elantra',
          year: 2018
        },
        rating: [5, 4, 4]
      },
      {
        firstName: 'Sophia',
        lastName: 'Moore',
        picture: 'not available',
        car: {
          make: 'Kia',
          model: 'Sorento',
          year: 2016
        },
        rating: [3, 5, 4]
      },
      {
        firstName: 'William',
        lastName: 'Brown',
        picture: 'not available',
        car: {
          make: 'Jeep',
          model: 'Cherokee',
          year: 2019
        },
        rating: [4, 3, 5]
      }
];

const p1 = Driver.deleteMany({})

Promise.all([p1]).then(function(results) {
    console.log(results);
    return Driver.create(driverData);
})
.then(function(driverData) {
    console.log(driverData);
})
.then(process.exit)

// Function to seed the database
// async function seedDatabase() {
//     try {
//       // Clear existing promo codes
//       await Driver.deleteMany({});
  
//       // Insert new promo codes
//       await PromoCode.create({ code: 'SAVE10', discount: 10 });
//       await PromoCode.create({ code: 'SAVE20', discount: 20 });
//       await PromoCode.create({ code: 'SAVE30', discount: 30 });
  
//       console.log('Database seeded successfully');
//     } catch (error) {
//       console.error('Error seeding database:', error);
//     } finally {
//       // Close the database connection
//       process.exit;
//     }
//   }
  
//   // Run the seeding function
//   seedDatabase();