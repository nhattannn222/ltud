// const admin = require('firebase-admin');
// const serviceAccount = require('../ltud-1268c-firebase-adminsdk-nmczk-026bb7c720.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// class FirebaseService{
// async fcmBienDong(title,body,token){
//     const message = {
//         notification: {
//           title,
//           body,
//         },
//         token, // Mã thiết bị hoặc mã đăng ký FCM Token
//       };
//       try {
//         const response = await admin.messaging().send(message);
//         console.log('Thông báo đã được gửi:', response);
//         res.status(200).json({ success: true });
//       } catch (error) {
//         console.error('Gửi thông báo thất bại:', error);
//         res.status(500).json({ success: false });
//       }
// }
// }
// const firebaseService=new FirebaseService();
// module.exports = firebaseService;