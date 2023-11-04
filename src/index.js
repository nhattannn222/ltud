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

function getAccessToken() {
  return new Promise(function(resolve, reject) {
    const key = require('./ltud-1268c-firebase-adminsdk-nmczk-026bb7c720.json');
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}
const admin = require('firebase-admin');
const serviceAccount = require('./ltud-1268c-firebase-adminsdk-nmczk-026bb7c720.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const axios = require('axios');
const { respone } = require("./helpers/respones");
app.post("/send-notification", async (req, res,next) => {
 
const apiUrl = 'https://fcm.googleapis.com/v1/projects/ltud-1268c/messages:send';
const authToken = `Bearer ${getAccessToken()}`; // Thay thế bằng mã xác thực Firebase của bạn

const requestData = {
  message: {
    token: 'ebrA_p6PRo-R7v1MoEEEpt:APA91bHYGJHjMdEzN8y-DW3hOBwR4R2c7p_MLq79u71McTcYvSr0tseJKPv45-aV-dOvTtwLLpub_l3FLodqA7fGbIVlxbk6ABhWcCYv3yf5Wu2bbuZJ5a0VocOMDDLm6aIKArZNeNbi', // Thay thế bằng token của thiết bị đích
    notification: {
      body: 'This is an FCM notification message!',
      title: 'FCM Message',
    },
  },
};

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': authToken,
  },
};

axios.post(apiUrl, requestData, config)
  .then((response) => {
    console.log('API response:', response.data);
    res.status(200).json(respone(response));
  })
  .catch((error) => {
    console.error('API error:', error);
    next(error);
  });

  
});
app.use(handelErrors);
  
app.listen(4000);