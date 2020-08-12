
// A basic API call which shows that a simulation can be created using these API routes. 
// Run the server in the server.js file and open localhost:3000 to see the result in the console

$.ajax({
    method: "POST",
    url: "/api/simulation/new",
    data: {
        symbol: 'SPY',
        startDate: "2020-01-01",
        endDate: "2020-06-01",
        investment: 1000,
        strategyFuncName: "example",
        strategyParams: [1, 2, 3]
    }
}).then(result => {
    console.log(result)
})
