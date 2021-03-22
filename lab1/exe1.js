'use string';

const dayjs = require('dayjs');

function task(id, description, urgent = false, itspvt = false, deadline) {
   this.id = (typeof id == 'number') ? id : null;
   this.description = (typeof description == 'string') ? description : "";
   this.urgent = (typeof urgent == 'boolean') ? urgent : false;
   this.itspvt = (typeof pvt == 'boolean') ? itspvt : false;
   this.deadline = (typeof deadline == 'string') ? dayjs(deadline) : false;

   this.toString = () => { return `ID: ${this.id} ,  Description: ${this.description}, Urgent : ${this.urgent}, Private : ${this.itspvt}, Deadline: ${(!this.deadline) ? "<not defined>" : this.deadline.format("DD-MM-YYYY")} ` }

   // !deadline= If deadline not equal then change false to undefined. 
}


function taskList() {

   this.tasks = []; // task 

   // Add Tasks
   this.add = (task) => {
      this.tasks.push(task);
   };

   // Sort and Print 
   this.sortAndPrint = () => {
      console.log(" Sort the tasks according to deadline in ascending order")

      return [...this.tasks].sort((a, b) => a.deadline === undefined || !b.deadline === undefined ? 1 : -1);

   }
   // Filter and Print 

   this.filterAndPrint = () => {
      console.log(" Filter the tasks urgent =True ")

      return [...this.tasks].filter((a, b) => (a.urgent == true || b.urgent == true));

   };

   this.print = () => {
      this.tasks.forEach((task) => console.log(task.toString()));
   }
}


function sortPrint(tasks) {


   console.log("**********Tasks sorted by deadline(most recent first)*********")
   tasks.sortAndPrint().forEach((task)=>console.log(task.toString()));
}

function filterPrint(tasks) {


   console.log("**********Tasks filter only (urgent=True)*********")
   tasks.filterAndPrint().forEach((task)=>console.log(task.toString()))
}

function main()
{
const tasks1 = new task(1, 'Laudry', false, true, null);
const tasks2 = new task(2, 'Monday Lab', false, false, "March 16, 2021 10:00 AM");
const tasks3 = new task(3, 'Phone call', true, false, "March 8, 2021 4:20 PM");

const tasks = new taskList();          // Object of taskList
tasks.add(tasks1);                     // In Tasks you add the tasks  
tasks.add(tasks2);
tasks.add(tasks3);


sortPrint(tasks);
filterPrint(tasks);

}

main();


