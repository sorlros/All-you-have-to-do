// export const sendMessage = () => {
//   router.post("/push", (req, res, next) => {
//     const query = req.query;
//     const token = query.token;
//     const from = query.from;
//     const text = query.text;

//     let message = {
//       notification: {
//         title: from,
//         body: text,
//       },
//       token: token,
//     };

//     admin
//       .messaging()
//       .send(message)
//       .then(function (response) {
//         console.log("Successfully sent message: : ", response);
//         res.send(true);
//       })
//       .catch(function (err) {
//         console.log("Error Sending message!!! : ", err);
//         res.send(false);
//       });
//   });
// };
