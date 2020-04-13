var fetch = require('node-fetch');

var req = () => {

    fetch('http://localhost:3031/pollforcrash')
    .then (res => res.json())
    .then(json => console.log(json));


    // fetch('http://localhost:3031/crashfrompi')
    // .then (res => res.json())
    // .then(json => console.log(json));


    var body = { name: 'ryan', location: 'home', date: "4/12/2020" };
 
    // fetch('http://localhost:3031/crash', {
    //         method: 'post',
    //         body:    JSON.stringify(body),
    //         // body: body,
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //     .then(res =>  console.log(res)); // res.json())
    //     //.then(json => console.log(json));


}

req();