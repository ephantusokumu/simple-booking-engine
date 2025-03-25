const axios = require("axios");

const convertCurrency = async (amount, from, to) => {
    try {
        console.log(`Converting ${amount} from ${from} to ${to}`); // Log the parameters

        // Fetch exchange rates with USD as the base currency
        const response = await axios.get(
            `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_APP_ID}&symbols=${from},${to}`
        );

        console.log("Open Exchange Rates Response:", response.data); // Log the response

        if (!response.data.rates) {
            throw new Error(`Currency ${to} not found in Open Exchange Rates response.`);
        }

        const rates = response.data.rates;
        if (!rates[from] || !rates[to]) {
            throw new Error(`Invalid currency codes: ${from} or ${to}`);
        }

        // Convert the amount to USD first, then to the target currency
        const amountInUSD = amount / rates[from]; // Convert from the original currency to USD
        const finalAmount = amountInUSD * rates[to]; // Convert from USD to the target currency

        return finalAmount;
    } catch (error) {
        console.error("Currency conversion error:", error);
        throw error;
    }
};

module.exports = { convertCurrency };