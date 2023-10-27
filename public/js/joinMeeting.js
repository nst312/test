// const socket = io("/meeting");
// const videoGrid = document.getElementById("video-grid");
// const myVideo = document.createElement("video");
// const showChat = document.querySelector("#showChat");
// const backBtn = document.querySelector(".header__back");
// myVideo.muted = true;

// backBtn.addEventListener("click", () => {
//   document.querySelector(".main__left").style.display = "flex";
//   document.querySelector(".main__left").style.flex = "1";
//   document.querySelector(".main__right").style.display = "none";
//   document.querySelector(".header__back").style.display = "none";
// });

// showChat.addEventListener("click", () => {
//   document.querySelector(".main__right").style.display = "flex";
//   document.querySelector(".main__right").style.flex = "1";
//   document.querySelector(".main__left").style.display = "none";
//   document.querySelector(".header__back").style.display = "block";
// });

// var peer = new Peer({
//   // in localhost
//   host: "127.0.0.1",
//   port: 3030,
//   path: "/peerjs",

//   //in live
//   // host: "video-chat-0mf6.onrender.com",
//   // secure: true, // Use true for HTTPS
//   // port: 443,
//   // path: "/peerjs",

//   debug: 3,
// });

// let myVideoStream;
// let otherUserId;
// const peers = {};
// navigator.mediaDevices
//   .getUserMedia({
//     audio: true,
//     video: true,
//   })
//   .then((stream) => {
//     myVideoStream = stream;
//     socket.emit("random");
//     addVideoStream(myVideo, stream);

//     peer.on("call", (call) => {
//       console.log("someone call me");
//       call.answer(stream);
//       // let userId = localStorage.getItem('userId');
//       const video = document.createElement("video");
//       // video.id = userId;
//       call.on("stream", (userVideoStream) => {
//         addVideoStream(video, userVideoStream);
//       });
//     });

//     socket.on("random-user", (userId) => {
//       console.log(userId);
//       otherUserId = userId;
//       connectToNewUser(userId, stream);
//     });
//   });

// // let myVideoStream;
// // const peers = {};

// // (async function () {
// //   try {
// //     const stream = await navigator.mediaDevices.getUserMedia({
// //       audio: true,
// //       video: true,
// //     });
// //     socket.emit("random");
// //     myVideoStream = stream;
// //     console.log("y stream", stream);
// //     addVideoStream(myVideo, stream);

// //     peer.on("call", (call) => {
// //       console.log("someone call me");
// //       call.answer(stream);
// //       const video = document.createElement("video");
// //       call.on("stream", (userVideoStream) => {
// //         addVideoStream(video, userVideoStream);
// //       });
// //     });

// //     console.log("???????????????", socket);

// //     await socket.on("random-user", async (userId) => {
// //       console.log(">>>>>>>>>>>>>>>>>>", userId);
// //       console.log(".................", myVideoStream);

// //       connectToNewUser(userId, stream);
// //     });

// //     socket.on('just',(hr)=>{
// //       console.log(hr)
// //     })
// //   } catch (error) {
// //     console.error("Error accessing user media:", error);
// //   }
// // })();

// // socket.on("random-user", (userId) => {
// //   console.log(".................", userId);
// //   console.log(".................", myVideoStream);
// //   connectToNewUser(userId, myVideoStream);
// // });

// // socket.on('random-user',(userId)=>{
// //   console.log('userid', userId)
// // })

// socket.on("leave", (roomId, userId, otherUser) => {
//   socket.emit("leave-all", roomId);
//   userId.close();
//   otherUser.close();
// });

// const connectToNewUser = (userId, stream) => {
//   console.log("I call someone" + userId);
//   const call = peer.call(userId, stream);
//   const video = document.createElement("video");
//   // localStorage.setItem("userId", userId);
//   // video.id = userId
//   console.log(call);
//   console.log(">>>>>>>>>>>>>>>>>");
//   call.on("stream", (userVideoStream) => {
//     console.log("i call someone stream");
//     addVideoStream(video, userVideoStream);
//   });
//   call.on("close", () => {
//     video.remove();
//   });
//   peers[userId] = call;
// };

// socket.on("user-disconnected", (userId) => {
//   console.log("cut the call", userId);
//   if (peers[userId]) peers[userId].close();
//   peer.destroy();
//   const parentElement = myVideo.parentElement;
//   const childElements = parentElement.children;
//   for (let i = childElements.length - 1; i > 0; i--) {
//     parentElement.removeChild(childElements[i]);
//   }
//   // const parentElement = myVideo.parentElement; // Get the parent element (e.g., a div, body, or any other containing element)
//   // if (parentElement) {
//   //   parentElement.removeChild(myVideo); // Remove the video element from its parent
//   // } else {
//   //   console.log("Element has no parent.");
//   // }
// });

// peer.on("open", (id) => {
//   // localStorage.setItem("userId", id);
//   console.log("my id is ", id);
//   socket.emit("user-connect", id);
//   // if()
// });

// const addVideoStream = (video, stream) => {
//   console.log("Add video stream");
//   video.srcObject = stream;
//   video.addEventListener("loadedmetadata", () => {
//     video.play();
//     videoGrid.append(video);
//   });
// };

// let text = document.querySelector("#chat_message");
// let send = document.getElementById("send");
// let messages = document.querySelector(".messages");

// send.addEventListener("click", (e) => {
//   if (text.value.length !== 0) {
//     socket.emit("message", text.value);
//     text.value = "";
//   }
// });

// text.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && text.value.length !== 0) {
//     socket.emit("message", text.value);
//     text.value = "";
//   }
// });

// const retryRandom = document.querySelector("#retryRandom");
// const muteButton = document.querySelector("#muteButton");
// const stopVideo = document.querySelector("#stopVideo");
// const allVideo = document.getElementsByTagName("video");
// muteButton.addEventListener("click", () => {
//   const enabled = myVideoStream.getAudioTracks()[0].enabled;
//   if (enabled) {
//     myVideoStream.getAudioTracks()[0].enabled = false;
//     html = `<i class="fas fa-microphone-slash"></i>`;
//     muteButton.classList.toggle("background__red");
//     muteButton.innerHTML = html;
//   } else {
//     myVideoStream.getAudioTracks()[0].enabled = true;
//     html = `<i class="fas fa-microphone"></i>`;
//     muteButton.classList.toggle("background__red");
//     muteButton.innerHTML = html;
//   }
// });

// retryRandom.addEventListener("click", (e) => {
//   // socket.emit('random-leave');
//   // socket.emit("random");
// });

// function getEndCall() {
//   // const parentElement = myVideo.parentElement;
//   // const childElements = parentElement.children;
//   // // console.log(parentElement);
//   // // console.log(allVideo);
//   // // console.log(peer.id);
//   // socket.emit("leave-room", ROOM_ID);
//   // // peer.close();
//   // peer.destroy();
//   // for (let i = childElements.length - 1; i > 0; i--) {
//   //   parentElement.removeChild(childElements[i]);
//   // }
//   socket.emit("random-leave");
// }

// stopVideo.addEventListener("click", () => {
//   const enabled = myVideoStream.getVideoTracks()[0].enabled;
//   if (enabled) {
//     myVideoStream.getVideoTracks()[0].enabled = false;
//     html = `<i class="fas fa-video-slash"></i>`;
//     stopVideo.classList.toggle("background__red");
//     stopVideo.innerHTML = html;
//   } else {
//     myVideoStream.getVideoTracks()[0].enabled = true;
//     html = `<i class="fas fa-video"></i>`;
//     stopVideo.classList.toggle("background__red");
//     stopVideo.innerHTML = html;
//   }
// });

// socket.on("createMessage", (message, userName) => {
//   console.log("this is client");
//   messages.innerHTML =
//     messages.innerHTML +
//     `<div class="message">
//         <b><i class="far fa-user-circle"></i> <span> ${
//           userName === user ? "me" : userName
//         }</span> </b>
//         <span>${message}</span>
//     </div>`;
// });

// HTML:
// <script src="https://cdn.jsdelivr.net/npm/peerjs/dist/peerjs.min.js"></script>
console.log("Connecting to server...");
const socket = io("/meeting", { secure: true });

const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
myVideo.muted = true;

backBtn.addEventListener("click", () => {
  document.querySelector(".main__left").style.display = "flex";
  document.querySelector(".main__left").style.flex = "1";
  document.querySelector(".main__right").style.display = "none";
  document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});

const peer = new Peer(undefined, {
  // host: "/",
  // port: "3030",
  // path: "/peerjs",
  host: "test-381r.onrender.com/",
  secure: true, // Use true for HTTPS
  port: 443,
  path: "/peerjs",

  debug: 3,
});

let myVideoStream;
let otherUserId;
const peers = {};

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    console.log("inside the the");
    //not working
    // socket.emit("random");
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      console.log("someone call me");
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("random-user", (userId) => {
      console.log("Random user received:", userId);
      console.log(userId);
      otherUserId = userId;
      connectToNewUser(userId, stream);
    });
  });

socket.on("leave", (roomId) => {
  socket.emit("leave-all", roomId);
  window.location = "http://http://test-381r.onrender.com";
});

const connectToNewUser = (userId, stream) => {
  console.log("I call someone" + userId);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    console.log("i call someone stream");
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });
  peers[userId] = call;
};

socket.on("user-disconnected", (userId) => {
  console.log("cut the call", userId);
  if (peers[userId]) peers[userId].close();
  const parentElement = myVideo.parentElement;
  const childElements = parentElement.children;
  for (let i = childElements.length - 1; i > 0; i--) {
    parentElement.removeChild(childElements[i]);
  }
});

peer.on("open", (id) => {
  console.log("my id is ", id);
  console.log("Connected to the server.");
  socket.emit("user-connect", id);
  socket.emit("random");
});

const addVideoStream = (video, stream) => {
  console.log("Add video stream");
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
  if (text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

const retryRandom = document.querySelector("#retryRandom");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
const allVideo = document.getElementsByTagName("video");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

retryRandom.addEventListener("click", (e) => {
  // socket.emit('random-leave');
  // socket.emit("random");
});

function getEndCall() {
  const parentElement = myVideo.parentElement;
  const childElements = parentElement.children;
  // // console.log(parentElement);
  // // console.log(allVideo);
  // // console.log(peer.id);
  // socket.emit("leave-room", ROOM_ID);
  // // peer.close();
  // peer.destroy();
  // for (let i = childElements.length - 1; i > 0; i--) {
  //   parentElement.removeChild(childElements[i]);
  // }
  console.log(childElements.length)
  if(childElements.length>1){
    socket.emit("random-leave");
  }else window.location = "http://test-381r.onrender.com/";

}

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

socket.on("createMessage", (message, userName) => {
  console.log("this is client");
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
          userName === user ? "me" : userName
        }</span> </b>
        <span>${message}</span>
    </div>`;
});