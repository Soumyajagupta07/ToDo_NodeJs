import readline from "readline"; // Direct interaction with CLI

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const todos = [];

const showMenu = () => {
    console.log("\n1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Delete Task");
    console.log("4. Exit");
    r1.question("Choose an option: ", handleInput);
};

const handleInput = (choice) => {
    const option = Number(choice.trim()); // Remove extra spaces & convert to number

    if (isNaN(option)) {
        console.log("❌ Invalid input! Please enter a number.");
        return showMenu();
    }

    if (option === 1) {
        r1.question("Enter a task: ", (task) => {
            if (task.trim() === "") {
                console.log("❌ Task cannot be empty!");
            } else {
                todos.push(task.trim());
                console.log(`✅ Task added: ${task.trim()}`);
            }
            showMenu();
        });
    } 
    else if (option === 2) {
        if (todos.length === 0) {
            console.log("📭 No tasks available.");
        } else {
            console.log("\n📌 Your tasks:");
            todos.forEach((task, index) => console.log(`${index + 1}. ${task}`));
        }
        showMenu();
    } 
    else if (option === 3) {
        if (todos.length === 0) {
            console.log("❌ No tasks to delete.");
            return showMenu();
        }

        console.log("\n📌 Your tasks:");
        todos.forEach((task, index) => console.log(`${index + 1}. ${task}`));

        r1.question("Enter task number to delete: ", (num) => {
            const index = Number(num.trim()) - 1; // Convert input to array index

            if (isNaN(index) || index < 0 || index >= todos.length) {
                console.log("❌ Invalid task number.");
            } else {
                console.log(`🗑️ Deleted: ${todos.splice(index, 1)}`);
            }
            showMenu();
        });
    } 
    else if (option === 4) {
        console.log("👋 Goodbye!");
        r1.close();
    } 
    else {
        console.log("❌ Invalid option! Please choose a valid number.");
        showMenu();
    }
};

showMenu();
