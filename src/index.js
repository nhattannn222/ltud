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


const admin = require('firebase-admin');
const serviceAccount = require('./ltud-1268c-firebase-adminsdk-nmczk-026bb7c720.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const { respone } = require("./helpers/respones");
app.post("/send-notification", async (req, res,next) => {
 
try {

  const message = {
    data: {
      score: '850',
      time: '2:45',
    },
    token: registrationToken,
  };
  
  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
} catch (error) {
  next(error)
}

  
});
app.use(handelErrors);
  
app.listen(4000);