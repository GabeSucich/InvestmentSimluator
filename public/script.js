
// // A basic API call which shows that a simulation can be created using these API routes. 
// // Run the server in the server.js file and open localhost:3000 to see the result in the console

// $.ajax({
//     method: "POST",
//     url: "/api/joel",
//     data: {
//         symbol: 'AAPL',
//         startDate: "2005-01-03",
//         endDate: "2020-06-01",
//         investment: 10000,
//         strategyFuncName: "stateTaxAffect",
//         strategyParams: [13, 0]
//     }
// }).then(result => {
//     console.log(result)
// )

// //     // logic goes here
// //     let percentStateTax1 = stateTaxRate1 / 100
// //     let percentStateTax2 = StateTaxRate2 / 100
// //     let deltaStateTax = ((suggestionsArr[0] * percentStateTax1) - (suggestionsArr[1] * percentStateTax2))

// // })
// // function runStrategy(symbol, startDate, endDate, interval) {
// //     const object = { symbol: symbol, startDate: startDate, endDate: endDate, interval: interval };
// //     $.ajax({
// //         method: "POST",
// //         url: "/api/simulation/getIntervalDates",
// //         data: object
// //     })
// //         .then(actionDates => {
// //             $.ajax({
// //                 method: "POST",
// //                 url: "/api/simulation/new",
// //                 data: {
// //                     symbol: symbol,
// //                     startDate: startDate,
// //                     endDate: endDate,
// //                     investment: 100,
// //                     strategyFuncName: "monthlyInvestment",
// //                     strategyParams: [10, actionDates]
// //                 }
// //             }).then(result => {
// //                 console.log(result)
// //             })
// //         })
// }

// // runStrategy("ACB", "2010-08-01", "2020-08-01", 10)
