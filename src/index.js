const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const REFRESH_INTERVAL = parseInt(process.env.REFRESH_INTERVAL || "10000", 10);
const COMMISSION = parseFloat(process.env.COMMISSION || "0.0001");

let cachedPrice = {
    bid: null,
    ask: null,
    average: null,
    updatedAt: null
};

async function fetchPrice() {
    try {
        const url = "https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT";
        const { data } = await axios.get(url);

        const bid = parseFloat(data.bidPrice) * (1 - COMMISSION);
        const ask = parseFloat(data.askPrice) * (1 + COMMISSION);
        const average = (bid + ask) / 2;

        cachedPrice = {
            bid: bid.toFixed(2),
            ask: ask.toFixed(2),
            average: average.toFixed(2),
            updatedAt: new Date().toISOString()
        };

        console.log("Updated price:", cachedPrice);
    } catch (err) {
        console.error("Error fetching price:", err.message);
    }
}

fetchPrice();
setInterval(fetchPrice, REFRESH_INTERVAL);

app.get("/price", (req, res) => {
    if (!cachedPrice.bid) {
        return res.status(503).json({ error: "Price not available yet" });
    }
    res.json(cachedPrice);
});

app.listen(PORT, () => {
    console.log(`BTC service running on port ${PORT}`);
});
