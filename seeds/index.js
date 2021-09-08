const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (i = 0; i < 200; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [`${cities[rand1000].longitude}`, `${cities[rand1000].latitude}`]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djntaxpzx/image/upload/v1631039605/yelpcamp/j3r9otmkbow3esiovswh.png',
                    filename: 'yelpcamp/j3r9otmkbow3esiovswh'
                },
                {
                    url: 'https://res.cloudinary.com/djntaxpzx/image/upload/v1631039605/yelpcamp/wxihciehye3aipzl1toz.png',
                    filename: 'yelpcamp/wxihciehye3aipzl1toz'
                },
                {
                    url: 'https://res.cloudinary.com/djntaxpzx/image/upload/v1631039604/yelpcamp/mfpw85pa92sr1sqrvdtr.png',
                    filename: 'yelpcamp/mfpw85pa92sr1sqrvdtr'
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, nemo! Neque tempore officiis animi. Quod incidunt quam, aperiam magni assumenda esse a asperiores recusandae blanditiis, ab molestias! Eos, minima quidem.',
            price,
            author: '61363078d0cff838645c0a88'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});