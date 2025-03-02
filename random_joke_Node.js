import http from "http";
import chalk from "chalk";
const getJokes = () => {
    const url = "https://icanhazdadjoke.com/";
    http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        })

        res.on('end',() => {
            const joke = JSON.parse(data).joke;
            console.log(chalk.green(`Here's a joke for you: ${joke}`));
            
        })
    })
}