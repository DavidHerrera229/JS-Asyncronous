//Promises <--- makes a promise statement/object, that is later returned by a asynch. function.

//handlers : "fetch" modern replacement for "XMLHttpRequest"

//Fetch() API --- returns while request is ongoing, lets program stay responsive.
// received response: 200 <--- a status code that means request worked.


//Coding tutorial example //
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

console.log(fetchPromise);

fetchPromise.then((response) => { // .then <--- is a handler, that is passing a "Response" object.
  console.log(`Received response: ${response.status}`); // <---this is giving the server's response "pending" in the console.
});

console.log("Started request…"); //<--- logged before receiving a response

// result in the browser console//
Promise { <state>: "pending" } </state>//<--- this is telling us we have a promise in the console.
Started request…
Received response: 200

// Chaining Promises // 
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise.then((response) => {
  const jsonPromise = response.json(); // <--- getting response data (Async)
  jsonPromise.then((data) => { //<--- a new .then
    console.log(data[0].name);
  });
});

Promise { <state>: "pending" } </state>

baked beans //<---name of first product in "products.json"



// Re-writing code to avoid a similar issue with callback inside a callback //

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise                                  //---- ".then((response) =>" lowered below + response.json
  .then((response) => response.json())        //<--- we take out writing "const jsonPromise"
  .then((data) => {                           //<--- keep .then, removes "json.Promise"
    console.log(data[0].name);                //<--- same as above
  });



//--- checking if the server accepted or was able to handle request / code status //
  const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  });

//--- *Catching Errors* ---- //
// The API can give errors, how do you handle them?
// promise objects provide a "catch()" method.
// .then() is used to pass through when the async function succeeds!
// .catch is called when the async function fails!

const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => {                                  //<---------this gave us an error alert in the console
    console.error(`Could not get products: ${error}`); //<---------error message in the console
  });

// * Promise Terminology * //
// (Promise has 3 states)
//  Pending    : function has not succeeded or failed yet, returned from a call to fetch(), but request is still in process.
//  Fulfilled  : when a promise is fulfilled.
//  Rejected   : promise rejected.

// Settled : use to cover both fulfilled & rejected.
// Resolved: if settled, or locked in to follow another promise?

//* combining multiple promises *//
// A promise chain is needed when the operation has several async functions.
// each promise needs to be completed before started the next one.

// "Promise.all()" <-- takes an array of promises and returns a single promise
// code example:
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3]) //<--- Here's the Promise.all, fetching 3 promises (array).
  .then((responses) => {
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch((error) => {                                     //<---- Once again, the catch used just incase it fails (error).
    console.error(`Failed to fetch: ${error}`)
  });
  // 404 (Not Found) <--- unlike 200, this is saying request does not exist! (in the browser console)

// next error example //
  const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
  const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
  const fetchPromise3 = fetch('bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');
//----------{url error above "bad-scheme"}

  Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => {
      for (const response of responses) {
        console.log(`${response.url}: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Failed to fetch: ${error}`)
    });
// <---result in console = "Failed to fetch: TypeError: Failed to fetch" 


//* Async & Await * -------------------------------- //
// a simpler way to work with async promise based code.
   
    async function myFunction() {
        // This is an async function
    }

// coding example of async with an "await" call //
async function fetchProducts() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // after this line, our function will wait for the `response.json()` call to be settled
      // the `response.json()` call will either return the parsed JSON object or throw an error
      const data = await response.json();
      console.log(data[0].name);
    }
    catch (error) { 
      console.error(`Could not get products: ${error}`);
    }
  }
  
  fetchProducts();
  
//* comparing *//
const promise = fetchProducts();
console.log(promise[0].name);   // "promise" is a Promise object, so this will not work.

const promise = fetchProducts();
promise.then((data) => console.log(data[0].name));