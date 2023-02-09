var fs = require("fs");
const taskFilePath = './task.txt'
const fd = fs.openSync(taskFilePath, 'a+')
if (process.argv[2] === "add") {
  if(!process.argv[3])
  {
    console.log("Error: Missing task string. Nothing added!")
    return;
  }
  fs.appendFile("task.txt", `${process.argv[3] + "\n"}`, function (err) {
    if (err) throw err;
    console.log(`Added task: "${process.argv[3]}"`);
  });
}
if (process.argv[2] === "ls") {

  fs.readFile("task.txt", "utf-8", function (err, data) {
    if (err) throw err;
    arr = data.split("\n");
    arr=arr.filter((value)=>{
      return value!==""
    })
    if(arr.length===0)
    {
     console.log(`There are no pending tasks!`);
     return; 
    }
    
    for(var i=arr.length-1;i>=0;i--)
    {
      console.log(`[${i+1}] ${arr[i]}`)
    }
  });
}
if (process.argv.length <= 2) {
  let help = `Usage :-
  $ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
  $ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
  $ ./task del INDEX            # Delete the incomplete item with the given index
  $ ./task done INDEX           # Mark the incomplete item with the given index as complete
  $ ./task help                 # Show usage
  $ ./task report               # Statistics`;
  console.log(help);
}
if (process.argv[2] == "del") {
  const argumentValue = process.argv[3];

  fs.readFile("task.txt", "utf-8", function (err, data) {
    if (err) throw err;
    if(process.argv.length<=3)
    { 
      console.log("Error: No such task for deletion.")
        return
    }
    if(argumentValue==0) 
    {
      console.log("Error: No such task for deletion.")
      return;
    }
    arr = data.split("\n");
    arr=arr.filter((value)=>{
      return value!==""
    })
    if (argumentValue > arr.length) {
      console.log(
        `Error: task #${argumentValue} does not exist. Nothing deleted.`
      );
      return;
    }
    else
    {
    arr.splice(argumentValue-1, 1);
    fs.writeFile("task.txt", arr.join("\n"), function (err) {
      if (err) throw err;
      console.log(`Deleted task #${argumentValue}`);
    });
}
  });
}
const getDate=(arg1)=>{

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + arg1 + mm + arg1 + dd;
return today;

}

if(process.argv[2]==="done")
{
     const itemnumber=process.argv[3];
     fs.readFile("task.txt", "utf-8", function (err, data) {
      if (err) throw err;
      if (!itemnumber) console.log("Error: No sich Number for marking task as done.")
      if(itemnumber==0) 
    {
      console.log("Error: NO such task for deletion")
      return;
    }
      arr = data.split("\n");
      const item=arr[itemnumber-1];
      arr.splice(itemnumber - 1, 1);
     fs.writeFile("task.txt", arr.join("\n"), function (err) {
      if (err) throw err;
    });
    fs.appendFile("done.txt",`x ${getDate('-')} ${item} \n`, function (err) {
      if (err) throw err;
      console.log(`Marked task #${itemnumber} as done.`)
    });

     })

}
if (process.argv[2] === "help") {
  let help = `Usage :-
  $ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
  $ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
  $ ./task del INDEX            # Delete the incomplete item with the given index
  $ ./task done INDEX           # Mark the incomplete item with the given index as complete
  $ ./task help                 # Show usage
  $ ./task report               # Statistics`;
  console.log(help);
}
if (process.argv[2] === "report") {

  fs.readFile("task.txt", "utf-8", function (err, data1) {
    if (err) throw err;
    arr1 = data1.split("\n");
    fs.readFile("done.txt", "utf-8", function (err, data2) {
      if (err) throw err;
      arr2 = data2.split("\n");
      for(var i=arr1.length-1;i>=0;i--)
        {
      console.log(`Pending : [${i+1}] ${arr1[i]}`)
        }
    for(var i=arr2.length-1;i>=0;i--)
        {
          console.log(`Completed: [${i+1}] ${arr2[i]}`)
        }
    })
    
  })
}