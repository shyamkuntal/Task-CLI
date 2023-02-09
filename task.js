const fs = require("fs"); 
const process = require("process"); 

let args = process.argv; 

let command = args[2];

 const info = () => {

console.log(`Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`                                                             
);
};

// Ls command
const pendingTasks = () => {
  currentDate = new Date();
  fs.readFile("task.txt", (err, data) => {
    if (err) {
      console.log(`There are no pending tasks!`);
    } else {
      let taskData = data.toString().split("\n");
      if (taskData == "") {
        console.log(`There are no pending tasks!`);
      } else {
        taskData.sort();
        if (taskData[0] == "") {
          taskData.shift();
        }
        console.log(`Pending : ${taskData.length}`);
        for (let i = 0; i < taskData.length; i++) {
          var temp = taskData[i].toString().split("");
          var task = taskData[i].toString().substring(1);
          console.log(`${i + 1}.${task} [${temp[0]}]`);
        }
      }
    }
  });
};

const pendingTasks2 = () => {
  currentDate = new Date();
  fs.readFile("task.txt", (err, data) => {
    if (err) {
      console.log(`There are no pending tasks!`);
    } else {
      let taskData = data.toString().split("\n");
      if (taskData == "") {
        console.log(`There are no pending tasks!`);
      } else {
        taskData.sort();
        if (taskData[0] == "") {
          taskData.shift();
        }
        console.log(`Pending : ${taskData.length}`);
        for (let i = 0; i < taskData.length; i++) {
          var temp = taskData[i].toString().split("");
          var task = taskData[i].toString().substring(1);
          console.log(`${i + 1}.${task} [${temp[0]}]\n`);
        }
      }
    }
  });
};

// Add pending tasks function
const add = () => {
  let p = args[3];
  let argument = args[4];
  if (p && argument) {
    let addTask = `\n${p} ${argument}`;
    fs.appendFile("task.txt", addTask, (err) => {
      if (err) throw err;
      else
        console.log(`Added task: "${argument}" with priority ${p}`);
    });
  } else {
    console.log(`Error: Missing tasks string. Nothing added!`);
  }
};

// Delete command function
const del = () => {
  let index = args[3];
  if (index) {
    fs.readFile("task.txt", (err, data) => {
      if (err)
        console.log(
            `  Error: task with index #${index} does not exist. Nothing deleted.`
        );
      else {
        let taskData = data.toString().split("\n");
        taskData.sort();
        if (taskData[0] == "") {
          taskData.shift();
        }
        if (index > taskData.length || index < 1) {
          console.log(`Error: task with index #${index} does not exist. Nothing deleted.`);
        } else {
          taskData.splice(index - 1, 1);
          let newData = taskData.join("\n");
          fs.writeFile("task.txt", newData, (err) => {
            if (err) throw err;
            else console.log(`Deleted task #${index}`);
          });
        }
      }
    });
  } else {
    console.log(`Error: Missing NUMBER for deleting tasks.`);
  }
};

// Completed command function
const done = () => {
  let index = args[3];
  if (index) {
    fs.readFile("task.txt", (err, data) => {
      if (err)
        console.log(`Error: no incomplete item with index #${index} exists.`);
      else {
        let taskData = data.toString().split("\n");
        taskData.sort();
        if (index > taskData.length || index < 1)
          console.log(`Error: no incomplete item with index #${index} exists.`);
        else {
          if (taskData[0] == "") taskData.shift();
          let doneTask = taskData[index - 1].slice(1).trim();
          fs.appendFile("completed.txt", doneTask + "\n", (err) => {
            if (err) throw err;
            else
              console.log(`Marked item as done.`);
          });
          taskData.splice(index - 1, 1);
          let newData = taskData.join("\n");
          fs.writeFile("task.txt", newData, (err) => {
            if (err) throw err;
          });
        }
      }
    });
  } else {
    console.log(`Error: Missing NUMBER for marking tasks as done.`);
  }
};

//complete task func
const completedTask = () => {
  fs.readFile("completed.txt", (err, data) => {
    if (err) {
      console.log(`There are no completed tasks!`);
    } else {
      let ctaskData = data.toString().split("\n");
      if (ctaskData == "") {
        console.log(`There are no completed tasks!`);
      } else {
        ctaskData.pop();
        console.log(`Completed : ${ctaskData.length}`);
        for (let k = 0; k < ctaskData.length; k++) {
          var cTask = ctaskData[k];
          console.log(`${k + 1}. ${cTask}`);
        }
      }
    }
  });
};

//Report command
const report = () => {
  pendingTasks2();
  completedTask();
};

switch (command) {
  case "help":
    info();
    break;
  case "ls":
    pendingTasks();
    break;
  case "add":
    add();
    break;
  case "del":
    del();
    break;
  case "done":
    done();
    break;
  case "report":
    report();
    break;
  default:
    info();
}