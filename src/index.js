const express = require("express");
const {sequelize}=require("./models")
const { handelErrors,AppError } = require("./helpers/error");
const cors = require('cors');
const app=express();
app.use(express.json());
app.use(express.static("."));
app.use(cors( 
  {
    origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  }
));
// sequelize.sync({alter:true});
const v1=require("./routers/v1");
const authorization = require("./middlewares/authorization");
app.use("/api/v1",v1);


// const admin = require('firebase-admin');
// const serviceAccount = require('./ltud-1268c-firebase-adminsdk-nmczk-026bb7c720.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const { respone } = require("./helpers/respones");
// app.get("/send-notification", async (req, res,next) => {
 
// try {

//   const message = {
//     notification: {
//       title: '`$FooCorp` up 1.43% on the day',
//       body: 'FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
//     },
//     android: {
//       notification: {
//         icon: 'stock_ticker_update',
//         color: '#7e55c3'
//       }
//     },
//     token: 'ebrA_p6PRo-R7v1MoEEEpt:APA91bHYGJHjMdEzN8y-DW3hOBwR4R2c7p_MLq79u71McTcYvSr0tseJKPv45-aV-dOvTtwLLpub_l3FLodqA7fGbIVlxbk6ABhWcCYv3yf5Wu2bbuZJ5a0VocOMDDLm6aIKArZNeNbi',
//   };
  
//   admin.messaging().send(message)
//     .then((response) => {
//       console.log('Successfully sent message:', response);
//       res.status(200).json(respone(response));
//     })
//     .catch((error) => {
//       console.log('Error sending message:', error);
//       throw error
//     });
// } catch (error) {
//   next(error)
// }

  
// });
app.use(handelErrors);
  
app.listen(4000);