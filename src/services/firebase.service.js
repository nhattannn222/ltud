const admin = require('firebase-admin');
const serviceAccount = require('../ltud-1268c-firebase-adminsdk-nmczk-026bb7c720.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
class FirebaseService{
async fcmBienDong(title,body,token){
    try {
        const message = {
          notification: {
            title,
            body,
          },
          android: {
            notification: {
              icon: 'stock_ticker_update',
              color: '#7e55c3'
            }
          },
          token,
        };
        
        admin.messaging().send(message)
          .then((response) => {
            console.log('Successfully sent message:', response);
            res.status(200).json(respone(response));
          })
          .catch((error) => {
            console.log('Error sending message:', error);
            throw error
          });
      } catch (error) {
        next(error)
      }
}
}
const firebaseService=new FirebaseService();
module.exports = firebaseService;