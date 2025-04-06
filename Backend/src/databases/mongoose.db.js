const mongoose = require('mongoose');
const config = require('config');

const MONGODB_URL = config.get('mongoDBUrl')

const connectToMongoDB = async () => { 
    try{
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB database connected!')
    } catch(err){
        console.log('MongoDB database connection error!')

        process.exit(1);
    }
};

const disconnectFromMongoDB = async () => {
    await mongoose.disconnect();
    console.log('MongoDB database disconnected successfuly!')
};

const initDB = async() => {
    console.log("started");
    const database = mongoose.connection.db;
    const heroesCollection = database.collection("Hero");
    console.log("trying to initialize");
    const heroes = [
        {
            heroName: "Superman", 
            power: "Attacker", //id: "111",
            colors: "blue and red", 
            image: "../uploads/Superman.webp", 
            powerLevel: {startingPower: 10, currentPower: 10},
            startingDate: new Date("2025-01-01")
        },
        {
            heroName: "Batman", 
            power: "Defender", //id: "111",
            colors: "black and blue", 
            image: "../uploads/Batman.webp", 
            powerLevel: {startingPower: 10, currentPower: 10},
            startingDate: new Date("2025-01-02")
        },
        {
            heroName: "Wonder Woman", 
            power: "Attacker", //id: "111",
            colors: "blue and red", 
            image: "../uploads/Wonder-woman.webp", 
            powerLevel: {startingPower: 10, currentPower: 10},
            startingDate: new Date("2025-01-03")
        }

    ];
    for(const hero of heroes){
        const existingHero = await heroesCollection.findOne({ heroName: hero.heroName });

        if (!existingHero) {
            await heroesCollection.insertOne(hero);
            console.log(`Inserted hero: ${hero.heroName}`);
        } else {
            console.log(`Hero ${hero.heroName} already exists, skipping initialization.`);
        }
        // await heroesCollection.updateOne(
        //     { heroName: hero.heroName },
        //     { $set: hero },
        //     { upsert: true }
        // );
    }
    console.log("initialized!")
}

module.exports = {
    connectToMongoDB,
    disconnectFromMongoDB,
    initDB
}