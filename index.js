import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 3000;


app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/check', async (req, res) => {
    const cryptoName = req.body.crypto.toUpperCase();
    
    try {
        const response = await axios.get('https://api.coinpaprika.com/v1/tickers');
        const result = response.data;
        var data = '';
        for (let i = 0; i < result.length; i++) {
            if (result[i].name.toUpperCase() === cryptoName || result[i].symbol.toUpperCase() === cryptoName) {
                data = result[i];
                break;
            }
        }
        const name = data.name;
        const price = data.quotes.USD.price;
        res.render('index.ejs', {name:name, price:price});
    } catch (error) {
        res.render('index.ejs', {name:error.status,price: error.error});
    }
})
    
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});