import readline from "readline";
import fs from 'fs';

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const fileCreation = () =>{
    r1.question('Enter fileName: ',(fileName)=>{
        r1.question("Enter the content for your file",(content) => {
            fs.writeFile(fileName + '.txt', content, (err) => {
                if (err) {
                    console.error(err);
                }
                else
                    console.log(`File created successfully`);
                r1.close();
            })
        })
    })
}