/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokensSnapshot = await admin.firestore().collection("tokens").get();
const tokens = tokensSnapshot.docs.map((doc) => doc.data().token);

// router.post('/push', (req,res,next)=>{
//   const query = req.query;
//   const token = query.token;
//   const from = query.from;
//   const text = query.text;

//   let message = {
//       notification: {
//           title: from,
//           body: text,
//         },
//       token: token,
//   }
  
//   admin
//   .messaging()
//   .send(message)
//   .then(function (response) {
//     console.log('Successfully sent message: : ', response)
//     res.send(true)
//   })
//   .catch(function (err) {
//     console.log('Error Sending message!!! : ', err)
//     res.send(false)
//   })
// })

// exports.sendScheduledMessage = functions.pubsub.schedule('every day 08:00').onRun(async (context) => {
//   const payload = {
//     notification: {
//       title: '일일 안내',
//       body: '오늘의 할 일을 확인하세요!',
//     },
//   };

//   // 사용자 토큰 가져오기
//   const tokensSnapshot = await admin.firestore().collection('tokens').get();
//   const tokens = tokensSnapshot.docs.map((doc) => doc.data().token);

//   // 메시지 전송
//   await admin.messaging().sendToDevice(tokens, payload);

//   console.log('Scheduled message sent successfully!');
// });