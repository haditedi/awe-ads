// const fb = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("stuff from facebook");
//   }, 3000);
// });
// const google = new Promise((resolve) => {
//   console.log("start");
//   setTimeout(() => {
//     resolve("stuff from google");
//   }, 2000);
// });

// Promise.all([fb, google]).then((res) => console.log(res));
// google.then((res) => console.log(res));

// const getStuff = (input) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(`stuff from ${input}`);
//     }, 2000);
//   });
// };

// getStuff("hello world").then((res) => console.log(res));
