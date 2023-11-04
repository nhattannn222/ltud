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
app.post("/send-notification", async (req, res,next) => {
  const message = {
    data: {
    score: '850',
    time: '2:45'
    },
    token: 'ebrA_p6PRo-R7v1MoEEEpt:APA91bHYGJHjMdEzN8y-DW3hOBwR4R2c7p_MLq79u71McTcYvSr0tseJKPv45-aV-dOvTtwLLpub_l3FLodqA7fGbIVlxbk6ABhWcCYv3yf5Wu2bbuZJ5a0VocOMDDLm6aIKArZNeNbi', // Mã thiết bị hoặc mã đăng ký FCM Token
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Thông báo đã được gửi:', response);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Gửi thông báo thất bại:', error);
    // res.status(500).json({ success: false });
    next(error);
  }
});
app.use(handelErrors);
  
app.listen(4000);