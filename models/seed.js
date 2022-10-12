///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Boba = require('./boba')


const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter fruits
    const startBobas = [
        { name: "Berry Peach Tea", recipes: "1/2 oz, 1/2 oz, 8 oz fresh brewed tea, ice", description: 'none'},
        { name: "Cinnamon Peach Tea", recipes: "6 mL, 1/2 oz, 7 oz fresh brewed tea", description: 'none'},
        { name: "Sparkling Peach Tea", recipes: " 1 oz of peach syrup,4 oz hibicus tea, 3 oz club soda", description: 'none' },
        { name: "Dragon Fruit Green Tea", recipes: "3/4 oz of dragon fruit syrup, 6 oz green tea", description: 'none' },
        { name: "Refresher", recipes: "1 wedge watermelon, 5 oz green tea, 1 oz watermelon syrup, 2 oz lemon-lime soda", description: 'none'},
        { name: "Black Currant Tea", recipes: "3/4 oz blackcurrant syrup, fresh brewed tea", description: 'none' },
        { name: "Orchard peach Snap", recipes: "1 1/4 oz peach tea concentrate, 1 pump ginger concentrated flavor, 6 oz club soda", description: 'none'},
        { name: "Amaretto Peach Tea", recipes: " 2 pumps peach concentrated flavor, 1/2 oz Amaretto syrup, fill with fresh brewed tea", description: 'none' },
        { name: "Watermelon Mint Tea", recipes: "1 oz watermelon syrup, 14 oz hot tea, 4 mint leaves", description: 'none' },
        { name: "Pumpkin Chai Tea Latte", recipes: "1 oz pumpkin spice syrup, 1 organic chai tea, filled with steamed milk", description: 'none'}

        ,
    ]

    // delete all the existing fruits
    Boba.deleteMany({ owner: null })
        .then(deletedBobas => {
            console.log('this is what .deleteMany returns', deletedBobas)


            Boba.create(startbobas)
                .then(data => {
                    console.log('here are the newly created fruits', data)
                    
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
           
            db.close()
        })
})