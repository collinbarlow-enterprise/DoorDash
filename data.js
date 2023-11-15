// exports.restaurants = [
//     {name: 'String', 
//     cuisineType: 'String',
//      menu: {
//         dishName: {type: String},
//         description: {type: String},
//         ingredients: [{type: String}], 
//         price: {type: Number},
//         ratings: {type: Number},
//         reviews: [{type: String}],
//     } },

exports.restaurants = [
    // Chinese cuisine
    {
        name: 'Golden Dragon Dim Sum',
        cuisineType: 'Chinese',
        menu: [
            { dishName: 'Har Gow (Shrimp Dumplings)', description: 'Steamed dumplings filled with shrimp and bamboo shoots', ingredients: ['shrimp', 'bamboo shoots', 'dumpling wrapper'], price: 12.99 },
            { dishName: 'Xiao Long Bao (Soup Dumplings)', description: 'Delicate dumplings filled with pork and hot savory broth', ingredients: ['pork', 'broth', 'dumpling wrapper'], price: 14.99 },
            { dishName: 'Chow Mein', description: 'Stir-fried noodles with mixed vegetables and your choice of protein', ingredients: ['noodles', 'vegetables', 'protein of choice'], price: 10.99 },
            { dishName: 'Peking Duck Rolls', description: 'Crispy duck skin, hoisin sauce, and scallions wrapped in a thin pancake', ingredients: ['Peking duck', 'hoisin sauce', 'scallions', 'pancake'], price: 18.99 },
            { dishName: 'Mango Sticky Rice', description: 'Sweet sticky rice topped with fresh mango slices and coconut milk', ingredients: ['sticky rice', 'mango', 'coconut milk'], price: 8.99 },
        ]
    },
    {
        name: 'Szechuan Spice House',
        cuisineType: 'Chinese',
        menu: [
            { dishName: 'Kung Pao Chicken', description: 'Spicy and flavorful stir-fried chicken with peanuts and vegetables', ingredients: ['chicken', 'peanuts', 'vegetables', 'spices'], price: 13.99 },
            { dishName: 'Mapo Tofu', description: 'Soft tofu cubes in a spicy and numbing sauce with ground pork', ingredients: ['tofu', 'pork', 'spicy sauce'], price: 11.99 },
            { dishName: 'Beef and Broccoli', description: 'Tender beef slices and broccoli florets in a savory brown sauce', ingredients: ['beef', 'broccoli', 'brown sauce'], price: 15.99 },
            { dishName: 'Hot and Sour Soup', description: 'Spicy and tangy soup with mushrooms, tofu, and bamboo shoots', ingredients: ['mushrooms', 'tofu', 'bamboo shoots', 'spices'], price: 9.99 },
            { dishName: 'Fortune Cookies', description: 'Sweet and crisp cookies with a hidden fortune inside', ingredients: ['flour', 'sugar', 'vanilla', 'fortune'], price: 2.99 },
        ]
    },
    {
        name: 'Dynasty Wok Express',
        cuisineType: 'Chinese',
        menu: [
            { dishName: 'General Tso\'s Chicken', description: 'Crispy fried chicken in a sweet and spicy General Tso\'s sauce', ingredients: ['chicken', 'General Tso\'s sauce', 'spices'], price: 14.99 },
            { dishName: 'Egg Drop Soup', description: 'Light and silky soup with beaten eggs and green onions', ingredients: ['eggs', 'broth', 'green onions'], price: 7.99 },
            { dishName: 'Sesame Chicken', description: 'Bite-sized chicken pieces coated in a sweet sesame glaze', ingredients: ['chicken', 'sesame glaze', 'sesame seeds'], price: 12.99 },
            { dishName: 'Vegetable Spring Rolls', description: 'Crispy spring rolls filled with mixed vegetables', ingredients: ['vegetables', 'spring roll wrapper'], price: 8.99 },
            { dishName: 'Lychee Bubble Tea', description: 'Refreshing tea beverage with lychee flavor and chewy tapioca pearls', ingredients: ['tea', 'lychee flavor', 'tapioca pearls'], price: 5.99 },
        ]
    },
    {
        name: 'Panda Garden Buffet',
        cuisineType: 'Chinese',
        menu: [
            { dishName: 'Dim Sum Platter', description: 'Assorted dim sum items, including dumplings and buns', ingredients: ['dumplings', 'buns', 'assorted fillings'], price: 16.99 },
            { dishName: 'Sweet and Sour Pork', description: 'Crispy pork bites in a tangy sweet and sour sauce with pineapple', ingredients: ['pork', 'sweet and sour sauce', 'pineapple'], price: 15.99 },
            { dishName: 'Shrimp Lo Mein', description: 'Stir-fried noodles with plump shrimp, vegetables, and soy-based sauce', ingredients: ['shrimp', 'noodles', 'vegetables', 'soy-based sauce'], price: 18.99 },
            { dishName: 'Crab Rangoon', description: 'Crispy wontons filled with cream cheese and crab meat', ingredients: ['wontons', 'cream cheese', 'crab meat'], price: 10.99 },
            { dishName: 'Green Tea Ice Cream', description: 'Smooth and creamy ice cream with a subtle green tea flavor', ingredients: ['green tea', 'ice cream'], price: 6.99 },
        ]
    },
    // Italian cuisine
    {
        name: 'Trattoria Bella Italia',
        cuisineType: 'Italian',
        menu: [
            { dishName: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil', ingredients: ['tomato sauce', 'mozzarella', 'basil', 'pizza dough'], price: 14.99 },
            { dishName: 'Spaghetti Bolognese', description: 'Spaghetti pasta with a rich meat sauce made with ground beef and tomatoes', ingredients: ['spaghetti', 'ground beef', 'tomatoes'], price: 16.99 },
            { dishName: 'Chicken Parmesan', description: 'Breaded and fried chicken cutlet topped with marinara sauce and melted cheese', ingredients: ['chicken cutlet', 'marinara sauce', 'cheese'], price: 18.99 },
            { dishName: 'Caprese Salad', description: 'Fresh tomatoes, mozzarella, and basil drizzled with balsamic glaze', ingredients: ['tomatoes', 'mozzarella', 'basil', 'balsamic glaze'], price: 10.99 },
            { dishName: 'Tiramisu', description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream', ingredients: ['ladyfingers', 'coffee', 'mascarpone cream'], price: 8.99 },
        ]
    },
    {
        name: 'Ristorante Romano',
        cuisineType: 'Italian',
        menu: [
            { dishName: 'Ravioli al Funghi', description: 'Homemade mushroom-filled ravioli with a creamy Alfredo sauce', ingredients: ['ravioli', 'mushroom filling', 'Alfredo sauce'], price: 17.99 },
            { dishName: 'Penne alla Vodka', description: 'Penne pasta in a vodka-infused tomato cream sauce with pancetta', ingredients: ['penne pasta', 'vodka', 'tomato cream sauce', 'pancetta'], price: 15.99 },
            { dishName: 'Veal Piccata', description: 'Veal scaloppini in a lemon and caper sauce, served with angel hair pasta', ingredients: ['veal scaloppini', 'lemon-caper sauce', 'angel hair pasta'], price: 21.99 },
            { dishName: 'Minestrone Soup', description: 'Hearty vegetable soup with beans and pasta in a savory broth', ingredients: ['vegetables', 'beans', 'pasta', 'broth'], price: 11.99 },
            { dishName: 'Cannoli', description: 'Crispy pastry shells filled with sweet ricotta cheese and chocolate chips', ingredients: ['pastry shells', 'ricotta cheese', 'chocolate chips'], price: 9.99 },
        ]
    },
    {
        name: 'Osteria della Nonna',
        cuisineType: 'Italian',
        menu: [
            { dishName: 'Gnocchi alla Sorrentina', description: 'Potato gnocchi baked with tomato sauce, mozzarella, and fresh basil', ingredients: ['gnocchi', 'tomato sauce', 'mozzarella', 'fresh basil'], price: 16.99 },
            { dishName: 'Linguine alle Vongole', description: 'Linguine pasta with fresh clams in a white wine and garlic sauce', ingredients: ['linguine pasta', 'clams', 'white wine', 'garlic'], price: 19.99 },
            { dishName: 'Eggplant Parmigiana', description: 'Sliced and breaded eggplant baked with marinara sauce and melted cheese', ingredients: ['eggplant', 'marinara sauce', 'cheese'], price: 14.99 },
            { dishName: 'Arugula and Prosciutto Salad', description: 'Peppery arugula, prosciutto, and Parmesan cheese with balsamic vinaigrette', ingredients: ['arugula', 'prosciutto', 'Parmesan cheese', 'balsamic vinaigrette'], price: 12.99 },
            { dishName: 'Panna Cotta', description: 'Creamy Italian dessert with vanilla flavor, topped with berry compote', ingredients: ['cream', 'vanilla', 'berry compote'], price: 7.99 },
        ]
    },
    {
        name: 'Cucina Toscana',
        cuisineType: 'Italian',
        menu: [
            { dishName: 'Fettuccine Alfredo', description: 'Fettuccine pasta in a creamy Alfredo sauce with Parmesan cheese', ingredients: ['fettuccine pasta', 'Alfredo sauce', 'Parmesan cheese'], price: 15.99 },
            { dishName: 'Osso Buco', description: 'Braised veal shanks in a rich broth with tomatoes and white wine', ingredients: ['veal shanks', 'broth', 'tomatoes', 'white wine'], price: 23.99 },
            { dishName: 'Bruschetta', description: 'Toasted bread topped with diced tomatoes, garlic, and basil', ingredients: ['bread', 'tomatoes', 'garlic', 'basil'], price: 9.99 },
            { dishName: 'Spinach and Ricotta Stuffed Shells', description: 'Jumbo pasta shells filled with spinach and ricotta, baked in marinara sauce', ingredients: ['pasta shells', 'spinach', 'ricotta', 'marinara sauce'], price: 18.99 },
            { dishName: 'Affogato', description: 'Vanilla gelato drowned in a shot of hot espresso', ingredients: ['vanilla gelato', 'espresso'], price: 8.99 },
        ]
    },
    // Japanese cuisine
    {
        name: 'Sakura Sushi House',
        cuisineType: 'Japanese',
        menu: [
            { dishName: 'Sushi Platter', description: 'Assorted nigiri and sashimi served with pickled ginger and soy sauce', ingredients: ['rice', 'fish', 'seaweed', 'soy sauce'], price: 25.99 },
            { dishName: 'Miso Ramen', description: 'Ramen noodles in a savory miso broth with tofu, seaweed, and green onions', ingredients: ['ramen noodles', 'miso broth', 'tofu', 'seaweed', 'green onions'], price: 14.99 },
            { dishName: 'Chicken Katsu Curry', description: 'Breaded and fried chicken cutlet served with Japanese curry and rice', ingredients: ['chicken cutlet', 'curry sauce', 'rice'], price: 18.99 },
            { dishName: 'Tempura Udon', description: 'Udon noodles in a light broth with tempura shrimp and vegetables', ingredients: ['udon noodles', 'tempura shrimp', 'tempura vegetables'], price: 16.99 },
            { dishName: 'Matcha Ice Cream', description: 'Green tea-flavored ice cream with a drizzle of red bean paste', ingredients: ['matcha', 'ice cream', 'red bean paste'], price: 7.99 },
        ]
    },
    {
        name: 'Tokyo Teppanyaki Grill',
        cuisineType: 'Japanese',
        menu: [
            { dishName: 'Teppanyaki Steak', description: 'Sizzling grilled steak served with vegetables and teriyaki sauce', ingredients: ['steak', 'vegetables', 'teriyaki sauce'], price: 22.99 },
            { dishName: 'Hibachi Shrimp', description: 'Grilled shrimp with butter and garlic, served on a bed of fried rice', ingredients: ['shrimp', 'butter', 'garlic', 'fried rice'], price: 19.99 },
            { dishName: 'Vegetable Yakisoba', description: 'Stir-fried noodles with mixed vegetables and yakisoba sauce', ingredients: ['noodles', 'vegetables', 'yakisoba sauce'], price: 12.99 },
            { dishName: 'Teriyaki Salmon Bento', description: 'Grilled teriyaki salmon served with rice, salad, and a side of miso soup', ingredients: ['salmon', 'teriyaki sauce', 'rice', 'salad', 'miso soup'], price: 16.99 },
            { dishName: 'Green Tea Cheesecake', description: 'Cheesecake infused with green tea flavor, topped with matcha powder', ingredients: ['cream cheese', 'green tea', 'matcha powder'], price: 8.99 },
        ]
    },
    {
        name: 'Ramen Masters',
        cuisineType: 'Japanese',
        menu: [
            { dishName: 'Tonkotsu Ramen', description: 'Rich and creamy pork bone broth with ramen noodles, pork belly, and green onions', ingredients: ['pork bone broth', 'ramen noodles', 'pork belly', 'green onions'], price: 16.99 },
            { dishName: 'Vegetarian Miso Soup', description: 'Miso soup with tofu, seaweed, and assorted vegetables', ingredients: ['miso soup', 'tofu', 'seaweed', 'vegetables'], price: 9.99 },
            { dishName: 'Chashu Don', description: 'Sliced pork belly on a bed of rice, drizzled with a sweet soy-based sauce', ingredients: ['pork belly', 'rice', 'soy-based sauce'], price: 13.99 },
            { dishName: 'Gyoza Platter', description: 'Pan-fried dumplings filled with pork and vegetables, served with dipping sauce', ingredients: ['pork', 'vegetables', 'dumplings', 'dipping sauce'], price: 11.99 },
            { dishName: 'Mochi Ice Cream', description: 'Chewy rice cake filled with various ice cream flavors', ingredients: ['mochi', 'ice cream'], price: 6.99 },
        ]
    },
    {
        name: 'Sushi Fusion Lounge',
        cuisineType: 'Japanese',
        menu: [
            { dishName: 'Dragon Roll', description: 'Eel, avocado, and cucumber rolled in seaweed and rice, topped with tobiko', ingredients: ['eel', 'avocado', 'cucumber', 'seaweed', 'rice', 'tobiko'], price: 18.99 },
            { dishName: 'Spicy Tuna Tartare', description: 'Diced spicy tuna mixed with avocado, served with crispy wonton chips', ingredients: ['spicy tuna', 'avocado', 'wonton chips'], price: 14.99 },
            { dishName: 'Rainbow Sashimi Bowl', description: 'Assorted fresh sashimi slices arranged over a bowl of sushi rice', ingredients: ['sashimi', 'sushi rice'], price: 24.99 },
            { dishName: 'Salmon Avocado Roll', description: 'Salmon and avocado rolled in seaweed and rice, served with wasabi and soy sauce', ingredients: ['salmon', 'avocado', 'seaweed', 'rice', 'wasabi', 'soy sauce'], price: 15.99 },
            { dishName: 'Green Tea Parfait', description: 'Layers of green tea-flavored ice cream, matcha sponge cake, and red bean paste', ingredients: ['green tea ice cream', 'matcha sponge cake', 'red bean paste'], price: 10.99 },
        ]
    },
    {
        name: 'Udon Express',
        cuisineType: 'Japanese',
        menu: [
            { dishName: 'Curry Udon', description: 'Udon noodles in a rich Japanese curry broth with vegetables', ingredients: ['udon noodles', 'Japanese curry broth', 'vegetables'], price: 14.99 },
            { dishName: 'Teriyaki Tofu Bento', description: 'Grilled teriyaki tofu served with rice, edamame, and a side of miso soup', ingredients: ['tofu', 'teriyaki sauce', 'rice', 'edamame', 'miso soup'], price: 12.99 },
            { dishName: 'Tempura Soba', description: 'Buckwheat noodles served in a hot broth with shrimp and vegetable tempura', ingredients: ['soba noodles', 'tempura shrimp', 'tempura vegetables'], price: 16.99 },
            { dishName: 'Sesame Seared Tuna Bowl', description: 'Sesame-crusted seared tuna slices over a bowl of sushi rice', ingredients: ['seared tuna', 'sesame crust', 'sushi rice'], price: 20.99 },
            { dishName: 'Matcha Latte', description: 'Japanese green tea latte with frothed milk and a sprinkle of matcha powder', ingredients: ['matcha', 'milk'], price: 5.99 },
        ]
    },
    // French cuisine
    {
        name: 'Le Bistro Parisien',
        cuisineType: 'French',
        menu: [
            { dishName: 'Coq au Vin', description: 'Braised chicken cooked in red wine with mushrooms and onions', ingredients: ['chicken', 'red wine', 'mushrooms', 'onions'], price: 20.99 },
            { dishName: 'Bouillabaisse', description: 'Traditional Provençal fish stew with various types of fish and shellfish', ingredients: ['fish', 'shellfish', 'tomatoes', 'saffron'], price: 24.99 },
            { dishName: 'Quiche au Fromage', description: 'Savory pie with cheese, eggs, and cream', ingredients: ['cheese', 'eggs', 'cream'], price: 15.99 },
            { dishName: 'Escargot Bourguignon', description: 'Snails cooked in garlic, parsley, and butter', ingredients: ['snails', 'garlic', 'parsley', 'butter'], price: 18.99 },
            { dishName: 'Ratatouille', description: 'Provençal vegetable stew with eggplant, zucchini, and bell peppers', ingredients: ['eggplant', 'zucchini', 'bell peppers', 'tomatoes'], price: 14.99 },
        ]
    },
    {
        name: 'La Petite Brasserie',
        cuisineType: 'French',
        menu: [
            { dishName: 'Croque Monsieur', description: 'Grilled ham and cheese sandwich with béchamel sauce', ingredients: ['ham', 'cheese', 'bread', 'béchamel sauce'], price: 11.99 },
            { dishName: 'Duck Confit', description: 'Duck leg slow-cooked in its own fat until tender', ingredients: ['duck leg', 'duck fat', 'garlic', 'thyme'], price: 22.99 },
            { dishName: 'Salade Niçoise', description: 'Mixed salad with tuna, olives, tomatoes, and anchovies', ingredients: ['tuna', 'olives', 'tomatoes', 'anchovies'], price: 16.99 },
            { dishName: 'Cassoulet', description: 'Slow-cooked casserole with white beans, sausage, and duck', ingredients: ['white beans', 'sausage', 'duck', 'tomato'], price: 19.99 },
            { dishName: 'Crème Brûlée', description: 'Vanilla custard with a crispy caramelized sugar top', ingredients: ['cream', 'sugar', 'vanilla'], price: 8.99 },
        ]
    },
    {
        name: 'Le Gourmet Pâtisserie',
        cuisineType: 'French',
        menu: [
            { dishName: 'Baguette with Brie', description: 'Freshly baked baguette with creamy Brie cheese', ingredients: ['baguette', 'Brie cheese'], price: 6.99 },
            { dishName: 'Tartiflette', description: 'Potato, reblochon cheese, lardons, and onions baked in the oven', ingredients: ['potato', 'reblochon cheese', 'lardons', 'onions'], price: 17.99 },
            { dishName: 'Éclair au Chocolat', description: 'Chocolate éclair filled with pastry cream and topped with chocolate icing', ingredients: ['pastry cream', 'chocolate icing'], price: 9.99 },
            { dishName: 'Provençal Pizza', description: 'Pizza with tomatoes, olives, anchovies, and fresh herbs', ingredients: ['tomatoes', 'olives', 'anchovies', 'fresh herbs'], price: 14.99 },
            { dishName: 'Macarons Assortment', description: 'Assorted colorful macarons with various flavors', ingredients: ['almond flour', 'sugar', 'egg whites', 'flavorings'], price: 12.99 },
        ]
    },
    {
        name: 'Brasserie de Paris',
        cuisineType: 'French',
        menu: [
            { dishName: 'French Onion Soup', description: 'Caramelized onions in a rich beef broth topped with melted cheese', ingredients: ['onions', 'beef broth', 'cheese', 'bread'], price: 10.99 },
            { dishName: 'Confit de Canard Salad', description: 'Duck confit served on a bed of mixed greens with vinaigrette', ingredients: ['duck confit', 'mixed greens', 'vinaigrette'], price: 21.99 },
            { dishName: 'Pissaladière', description: 'Southern French tart with caramelized onions, olives, and anchovies', ingredients: ['onions', 'olives', 'anchovies', 'pastry'], price: 16.99 },
            { dishName: 'Bœuf Bourguignon', description: 'Slow-cooked beef stewed in red wine with carrots and mushrooms', ingredients: ['beef', 'red wine', 'carrots', 'mushrooms'], price: 18.99 },
            { dishName: 'Tarte Tatin', description: 'Upside-down caramelized apple tart', ingredients: ['apples', 'pastry dough', 'caramel'], price: 13.99 },
        ]
    },
    // French cuisine
    {
        name: 'Le Bistro Parisien',
        cuisineType: 'French',
        menu: [
            { dishName: 'Coq au Vin', description: 'Braised chicken cooked in red wine with mushrooms and onions', ingredients: ['chicken', 'red wine', 'mushrooms', 'onions'], price: 20.99 },
            { dishName: 'Bouillabaisse', description: 'Traditional Provençal fish stew with various types of fish and shellfish', ingredients: ['fish', 'shellfish', 'tomatoes', 'saffron'], price: 24.99 },
            { dishName: 'Quiche au Fromage', description: 'Savory pie with cheese, eggs, and cream', ingredients: ['cheese', 'eggs', 'cream'], price: 15.99 },
            { dishName: 'Escargot Bourguignon', description: 'Snails cooked in garlic, parsley, and butter', ingredients: ['snails', 'garlic', 'parsley', 'butter'], price: 18.99 },
            { dishName: 'Ratatouille', description: 'Provençal vegetable stew with eggplant, zucchini, and bell peppers', ingredients: ['eggplant', 'zucchini', 'bell peppers', 'tomatoes'], price: 14.99 },
        ]
    },
    {
        name: 'La Petite Brasserie',
        cuisineType: 'French',
        menu: [
            { dishName: 'Croque Monsieur', description: 'Grilled ham and cheese sandwich with béchamel sauce', ingredients: ['ham', 'cheese', 'bread', 'béchamel sauce'], price: 11.99 },
            { dishName: 'Duck Confit', description: 'Duck leg slow-cooked in its own fat until tender', ingredients: ['duck leg', 'duck fat', 'garlic', 'thyme'], price: 22.99 },
            { dishName: 'Salade Niçoise', description: 'Mixed salad with tuna, olives, tomatoes, and anchovies', ingredients: ['tuna', 'olives', 'tomatoes', 'anchovies'], price: 16.99 },
            { dishName: 'Cassoulet', description: 'Slow-cooked casserole with white beans, sausage, and duck', ingredients: ['white beans', 'sausage', 'duck', 'tomato'], price: 19.99 },
            { dishName: 'Crème Brûlée', description: 'Vanilla custard with a crispy caramelized sugar top', ingredients: ['cream', 'sugar', 'vanilla'], price: 8.99 },
        ]
    },
    {
        name: 'Le Gourmet Pâtisserie',
        cuisineType: 'French',
        menu: [
            { dishName: 'Baguette with Brie', description: 'Freshly baked baguette with creamy Brie cheese', ingredients: ['baguette', 'Brie cheese'], price: 6.99 },
            { dishName: 'Tartiflette', description: 'Potato, reblochon cheese, lardons, and onions baked in the oven', ingredients: ['potato', 'reblochon cheese', 'lardons', 'onions'], price: 17.99 },
            { dishName: 'Éclair au Chocolat', description: 'Chocolate éclair filled with pastry cream and topped with chocolate icing', ingredients: ['pastry cream', 'chocolate icing'], price: 9.99 },
            { dishName: 'Provençal Pizza', description: 'Pizza with tomatoes, olives, anchovies, and fresh herbs', ingredients: ['tomatoes', 'olives', 'anchovies', 'fresh herbs'], price: 14.99 },
            { dishName: 'Macarons Assortment', description: 'Assorted colorful macarons with various flavors', ingredients: ['almond flour', 'sugar', 'egg whites', 'flavorings'], price: 12.99 },
        ]
    },
    {
        name: 'Brasserie de Paris',
        cuisineType: 'French',
        menu: [
            { dishName: 'French Onion Soup', description: 'Caramelized onions in a rich beef broth topped with melted cheese', ingredients: ['onions', 'beef broth', 'cheese', 'bread'], price: 10.99 },
            { dishName: 'Confit de Canard Salad', description: 'Duck confit served on a bed of mixed greens with vinaigrette', ingredients: ['duck confit', 'mixed greens', 'vinaigrette'], price: 21.99 },
            { dishName: 'Pissaladière', description: 'Southern French tart with caramelized onions, olives, and anchovies', ingredients: ['onions', 'olives', 'anchovies', 'pastry'], price: 16.99 },
            { dishName: 'Bœuf Bourguignon', description: 'Slow-cooked beef stewed in red wine with carrots and mushrooms', ingredients: ['beef', 'red wine', 'carrots', 'mushrooms'], price: 18.99 },
            { dishName: 'Tarte Tatin', description: 'Upside-down caramelized apple tart', ingredients: ['apples', 'pastry dough', 'caramel'], price: 13.99 },
        ]
    },
    // American cuisine
    {
        name: 'Burger Joint USA',
        cuisineType: 'American',
        menu: [
            { dishName: 'Classic Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese', ingredients: ['beef patty', 'lettuce', 'tomato', 'cheese'], price: 12.99 },
            { dishName: 'BBQ Ribs', description: 'Slow-cooked ribs glazed with BBQ sauce', ingredients: ['pork ribs', 'BBQ sauce'], price: 18.99 },
            { dishName: 'Loaded Fries', description: 'Crispy fries topped with melted cheese, bacon, and green onions', ingredients: ['fries', 'cheese', 'bacon', 'green onions'], price: 9.99 },
            { dishName: 'Chicken Wings', description: 'Spicy buffalo chicken wings served with ranch dressing', ingredients: ['chicken wings', 'buffalo sauce', 'ranch dressing'], price: 15.99 },
            { dishName: 'Vegetarian Wrap', description: 'Grilled vegetables wrapped in a tortilla with hummus', ingredients: ['zucchini', 'bell peppers', 'onions', 'hummus'], price: 11.99 },
        ]
    },
    {
        name: 'Steakhouse Grill',
        cuisineType: 'American',
        menu: [
            { dishName: 'Ribeye Steak', description: 'Prime ribeye steak cooked to perfection', ingredients: ['ribeye steak', 'salt', 'pepper'], price: 24.99 },
            { dishName: 'Shrimp Scampi', description: 'Garlic and butter shrimp served over pasta', ingredients: ['shrimp', 'garlic', 'butter', 'pasta'], price: 19.99 },
            { dishName: 'Buffalo Chicken Salad', description: 'Crispy chicken tossed in buffalo sauce on a bed of fresh greens', ingredients: ['chicken', 'buffalo sauce', 'lettuce', 'tomato'], price: 13.99 },
            { dishName: 'Philly Cheesesteak', description: 'Sliced beefsteak with melted cheese on a hoagie roll', ingredients: ['beefsteak', 'cheese', 'hoagie roll'], price: 16.99 },
            { dishName: 'Southern BBQ Pulled Pork', description: 'Slow-cooked pulled pork in BBQ sauce', ingredients: ['pulled pork', 'BBQ sauce', 'coleslaw'], price: 17.99 },
        ]
    },
    {
        name: 'Diner Delight',
        cuisineType: 'American',
        menu: [
            { dishName: 'Pancake Stack', description: 'Fluffy pancakes served with maple syrup', ingredients: ['pancakes', 'maple syrup', 'butter'], price: 8.99 },
            { dishName: 'Chicken and Waffles', description: 'Fried chicken on top of a crispy waffle, drizzled with honey', ingredients: ['fried chicken', 'waffle', 'honey'], price: 14.99 },
            { dishName: 'Grilled Cheese Sandwich', description: 'Melted cheese between slices of buttered bread', ingredients: ['cheese', 'bread', 'butter'], price: 10.99 },
            { dishName: 'BLT Sandwich', description: 'Classic bacon, lettuce, and tomato sandwich', ingredients: ['bacon', 'lettuce', 'tomato', 'bread'], price: 11.99 },
            { dishName: 'Mac n Cheese', description: 'Creamy macaroni and cheese', ingredients: ['macaroni', 'cheese', 'milk'], price: 12.99 },
        ]
    },
    {
        name: 'Smokehouse BBQ',
        cuisineType: 'American',
        menu: [
            { dishName: 'Brisket Platter', description: 'Slow-smoked beef brisket served with BBQ sauce', ingredients: ['beef brisket', 'BBQ sauce', 'pickles'], price: 21.99 },
            { dishName: 'Cornbread Muffins', description: 'Sweet and savory cornbread muffins', ingredients: ['cornmeal', 'flour', 'baking powder'], price: 6.99 },
            { dishName: 'Cajun Shrimp Po\' Boy', description: 'Cajun-spiced shrimp on a baguette with lettuce and remoulade', ingredients: ['shrimp', 'baguette', 'lettuce', 'remoulade'], price: 17.99 },
            { dishName: 'Loaded Potato Skins', description: 'Crispy potato skins filled with cheese, bacon, and sour cream', ingredients: ['potato skins', 'cheese', 'bacon', 'sour cream'], price: 10.99 },
            { dishName: 'BBQ Chicken Pizza', description: 'Grilled chicken, red onions, and BBQ sauce on a pizza crust', ingredients: ['chicken', 'red onions', 'BBQ sauce', 'pizza crust'], price: 15.99 },
        ]
    },
    {
        name: 'All-American Diner',
        cuisineType: 'American',
        menu: [
            { dishName: 'Classic Breakfast Platter', description: 'Eggs, bacon, toast, and hash browns', ingredients: ['eggs', 'bacon', 'toast', 'hash browns'], price: 9.99 },
            { dishName: 'Bacon Cheeseburger', description: 'Grilled bacon cheeseburger with all the fixings', ingredients: ['beef patty', 'bacon', 'cheese', 'lettuce', 'tomato'], price: 13.99 },
            { dishName: 'Chicken Fried Steak', description: 'Breaded and fried steak with country gravy', ingredients: ['steak', 'breadcrumbs', 'country gravy'], price: 16.99 },
            { dishName: 'Texas Chili', description: 'Spicy beef chili with beans, topped with cheese and onions', ingredients: ['beef', 'chili beans', 'cheese', 'onions'], price: 11.99 },
            { dishName: 'Apple Pie', description: 'Homemade apple pie with a flaky crust', ingredients: ['apples', 'sugar', 'cinnamon', 'pie crust'], price: 7.99 },
        ]
    }
];




