// import * as React from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


// function randomID(len) {
//   let result = '';
//   if (result) return result;
//   var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export function getUrlParams(
//   url = window.location.href
// ) {
//   let urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

// export default function App() {
//       const roomID = getUrlParams().get('roomID') || randomID(5);
//       let myMeeting = async (element) => {
//      // generate Kit Token
//       const appID = 1066195131;
//       const serverSecret = "92ac60ee3f3ba35e48523b2b1923cf5f";
//       const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


//      // Create instance object from Kit Token.
//       const zp = ZegoUIKitPrebuilt.create(kitToken);

//       zp.setCallInvitationConfig({
//         enableCustomCallInvitationWaitingPage: true,
//        // The following is the callback for showing the waiting page after a call invitation is sent. To cancel the call invitation, set it to [cancel].
//        onWaitingPageWhenSending: (callType,callees,cancel) =>{
//          // Add your custom logic here. 
//          // The following shows an example, the waitingPageDom is the DOM object that is used to represent the page element, here the page indicates the waiting page when sending a call invitation.
//           waitingPageDom.style.display = 'block';
//          // The method used to set the cancel call invitation operation.
//          cancelButton.onclick = () => {
//             cancel();
//          }
//        },
//        onSetRoomConfigBeforeJoining:(callType) => {
//            // The callback for set room config before joining the room, at which point you can hide the waiting page before joining the room.
//             waitingPageDom.style.display = 'none';
//         },
//         onCallInvitationEnded:(reason) => { 
//            // You will need to hide your custom waiting page when your call invitation is not connected successfully.
//             waitingPageDom.style.display = 'none';
//         }
    
//     })
//       // start the call
//       zp.joinRoom({
//         container: element,

//         sharedLinks: [
//           {
//             name: 'Personal link',
//             url:
//              window.location.protocol + '//' + 
//              window.location.host + window.location.pathname +
//               '?roomID=' +
//               roomID,
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
//         },
//       });


//   };
// React.useEffect(()=>{
//     myMeeting()
// },[])
//   return (
//     <div
//       className="myCallContainer"
//       ref={myMeeting}
//       style={{ width: '300px', height: '30vh' }}
//     ></div>
//   );
// }