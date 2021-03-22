'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

function Task(id, description, urgent = false, itspvt = false, deadline) {
    this.id = (typeof id == 'number') ? id : null;
    this.description = (typeof description == 'string') ? description : "";
    this.urgent = (typeof urgent == 'boolean') ? urgent : false;
    this.itspvt = (typeof pvt == 'boolean') ? itspvt : false;
    this.deadline = (typeof deadline == 'string') ? dayjs(deadline) : false;

    this.toString = () => { return `ID: ${this.id} ,  Description: ${this.description}, Urgent : ${this.urgent}, Private : ${this.itspvt}, Deadline: ${(!this.deadline) ? "<not defined>" : this.deadline.format("DD-MM-YYYY")}`}

}


function TaskList() {
    const db = new sqlite.Database('tasks.db', (err) => {
        if (err) throw err;
    });

    this.getAllTasks = () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * from tasks`;
            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const tasks = rows.map(row => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
                    resolve(tasks);
                }
            });
        });
    }

    this.getAfterDeadline = (deadline) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * from tasks WHERE deadline > ?`;
            db.all(sql, [deadline], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const tasks = rows.map(row => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
                    resolve(tasks);
                }
            });
        });
    };

    this.getTasksbyWord =(word) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * from tasks WHERE description like ?`;
            db.all(sql, ["%" + word + "%"], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const tasks = rows.map(row => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
                    resolve(tasks);
                }
            });
        });
    }

};


async function main() {
    try {
        const tasks = new TaskList();
        // get all tasks 
        console.log('**** All tasks *****')
        const result = await tasks.getAllTasks();
        result.forEach((task) => console.log(task.toString()) )
         
       // get tasks after deadline 
         const deadline='2021-03-09';
         console.log('******Tasks After Deadline ******')
         const futureTasks= await tasks.getAfterDeadline(deadline);
         futureTasks.forEach((task)=>console.log(task.toString()) )

         const word="lau";
         console.log('*****Tasks of a given word ******')
         const wordTasks=await tasks.getTasksbyWord(word);
         wordTasks.forEach((task)=>console.log(task.toString()) )


    } catch (error) {
        console.error(error);
        return;

    }

}

main();


