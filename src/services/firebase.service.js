const admin = require('firebase-admin');
const { json } = require('sequelize');
const serviceAccount = require('../ltud-1268c-firebase-adminsdk-nmczk-026bb7c720.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
class FirebaseService{
    
async fcmBienDong(title,body,token,tkNhan){
    try {
        const message = {
          data: {
            tkNhan:JSON.stringify(tkNhan),
          },
          notification: {
            title:title,
            body:body,
          },
          android: {
            notification: {
              smallIcon: 'stock_ticker_update',
              color: '#7e55c3'
            }
          },
          token:token,
        };
        
       const tb= await admin.messaging().send(message);
       return tb;
         
      } catch (error) {
        throw(error)
      }
}
}
const firebaseService=new FirebaseService();
module.exports = firebaseService;