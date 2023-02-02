//--- Synchronous Basics----
// ***synchronous*** code is run from top to bottom, in order - line by line.
        //example:
        const name = 'Miriam';
        const greeting = `Hello, my name is ${name}!`;
        console.log(greeting);
        // "Hello, my name is Miriam!"


//example synchronous code continued---//
//*makeGreeting is a function

        function makeGreeting(name){
            return "Hello, my name is $(name)!";
        }
// even by creating a function above, still will be synchronous.
        const name = 'Miriam';
        const greeting = `Hello, my name is ${name}!`;
        console.log(greeting);
        // "Hello, my name is Miriam!"

// Long running synch. function?
// A: depending on how much data or numbers a function is needed to calculate for a function, it can cause a time delay.

// Study Questions
// - Q: What is the primary difference between synchronous and asynchronous programming in JavaScript?
// - A: Primary difference is that synchronous runs or interprets code in order, top to bottom, line by line order.
// - Asynchronous code among the synchronous code, that will also be interpreted in order, but will most likely be displayed after synchronous code is done, or depending on the time function associated.

// Why is this useful?

// What problems does it solve?
// A: Synchronous code needs to finished in order, maybe causing a delay while trying to compute? The asynchronous function call help you continue functioning while it loads?

// How asynchronous function help long running synchronous function based on the example:
// A) Start a long-running operation by calling a function.
// B) Have that function start the operation and return immediately, so that our program can still be responsive to other events.
// C) Notify us with the result of the operation when it eventually completes.

// Examples of Asynchronous functions that can take time:
// fetch()
// getUserMedia()
// showOpenFilePicker

//* Event Handlers --- addEventListener "Click".
// In the example adding this function, gives you almost like alert/update while loading data.

//*Call Backs --- 
// if nested inside "callback is inside a callback"....creates a problem
// example:

function doStep1(init, callback){    // Vs // function doStep1(init){
    const result = init + 1;        //    //   return init + 1;
    callback(result)               //    //   }
}
