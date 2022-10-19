///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Boba = require('./boba')


const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter fruits
    const startBobas = [
        { name: "Berry Peach Tea", recipes: "1/2 oz Monin Blackberry Syrup, 1/2 oz monin White PEach Syrup, 8 oz fresh brewed tea, ice", description: 'none', owner: null, image: '/assets/pictures/fbefbbc6-b560-477d-980a-003dd4a76b07-1_1.png'},
        { name: "Cinnamon Peach Tea", recipes: "6 mL Monin Cinnanmon Syrup, 1/2 oz, 7 oz fresh brewed tea", description: 'none', owner: null, image: '/assets/pictures/Cinnamon Peach Tea.png'},
        { name: "Sparkling Peach Tea", recipes: " 1 oz of peach syrup,4 oz hibicus tea, 3 oz club soda", description: 'none', owner: null, image:'/assets/pictures/sparkling peach tea.webp' },
        { name: "Dragon Fruit Green Tea", recipes: "3/4 oz of dragon fruit syrup, 6 oz green tea", description: 'none', owner: null, image:'/assets/pictures/Dragon Fruit Green Tea.png' },
        { name: "Mango Dragon Fruit", recipes: "3/4 oz dragon fruit syrup, 1 pump mango concentrated flavor, 3 oz green tea, 3 oz lemonade", description: 'none', owner: null, image: '/assets/pictures/mango dragon fruit.png'},
        { name: "Black Currant Tea", recipes: "3/4 oz blackcurrant syrup, fresh brewed tea", description: 'none', owner: null, image: '/assets/pictures/5305CM_BlackCurant-LooseIced_24ct.jpeg' },
        { name: "Orchard peach Snap", recipes: "1 1/4 oz peach tea concentrate, 1 pump ginger concentrated flavor, 6 oz club soda", description: 'none', owner: null, image: '/assets/pictures/ORCHARD PEACH SNAP.webp'},
        { name: "Amaretto Peach Tea", recipes: " 2 pumps peach concentrated flavor, 1/2 oz Amaretto syrup, fill with fresh brewed tea", description: 'none', owner: null, image: '/assets/pictures/amaretto_peach_tea.png' },
        { name: "Watermelon Sparkling Mint", recipes: "5 leaf mint, 1 1/4 oz, 3 mL, ice, 6 oz sparkling water", description: 'none', owner: null, image: '/assets/pictures/watermelon sparkling mint.webp' },
        { name: "Pumpkin Chai Tea Latte", recipes: "1 oz pumpkin spice syrup, 1 organic chai tea, filled with steamed milk", description: 'none', owner: null, image: '/assets/pictures/pumpkin_chai_tea_latte.png'},
    ]
//Be more aware of your indentation and whitespace throughout your code
    // delete all the existing fruits
    Boba.deleteMany({ owner: null })
        .then(deletedBobas => {
            console.log('this is what .deleteMany returns', deletedBobas)


            Boba.create(startBobas)
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