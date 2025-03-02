import http from "http";
import readline from "readline";
import chalk from "chalk";

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const apikey = '33f8bbbe8a5237c5671623dc';  
const url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;

http.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data).conversion_rates;
            if (!json) {
                console.log(chalk.red("Error fetching exchange rates."));
                r1.close();
                return;
            }

            r1.question('Enter the amount in USD: ', (amount) => {
                const numericAmount = parseFloat(amount);
                if (isNaN(numericAmount) || numericAmount <= 0) {
                    console.log(chalk.red("Invalid amount. Please enter a valid number."));
                    r1.close();
                    return;
                }

                r1.question('Enter the target currency: ', (currency) => {
                    const rate = json[currency.toUpperCase()];
                    if (!rate) {
                        console.log(chalk.red("Invalid currency code. Please try again."));
                    } else {
                        const convertedAmount = numericAmount * rate;
                        console.log(chalk.green(`Converted Amount: ${convertedAmount.toFixed(2)} ${currency.toUpperCase()}`));
                    }
                    r1.close();
                });
            });

        } catch (error) {
            console.log(chalk.red("Error processing exchange rate data."));
            r1.close();
        }
    });
});
