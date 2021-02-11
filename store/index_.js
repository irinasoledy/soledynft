// export const state = () => ({
//   user: {},
//   messages: [],
//   users: [],
//   connectRoom: true,
//   videoProccess: true,
//   audioProccess: true,
//
//   videoMute: false,
//   videoUnmute: false,
//   audioMute: false,
//   audioUnmute: false,
// })
//
// export const mutations = {
//   setUser(state, user) {
//     state.user = user
//   },
//   clearData(state) {
//     state.user = {}
//     state.messages = []
//     state.users = []
//   },
//   SOCKET_newMessage(state, message) {
//     state.messages.push(message)
//   },
//   SOCKET_updateUsers(state, users) {
//     state.users = users
//   },
//   SOCKET_stopChat(state){
//       if (state.connectRoom === false) {
//           state.connectRoom = true
//       }else{
//           state.connectRoom = false
//       }
//   },
//   SOCKET_changeVideoProccess(state){
//       if (state.videoProccess === false) {
//           state.videoProccess = true
//       }else{
//           state.videoProccess = false
//       }
//   },
//   SOCKET_changeAudioProccess(state){
//       if (state.audioProccess === false) {
//           state.audioProccess = true
//       }else{
//           state.audioProccess = false
//       }
//   },
//   SOCKET_videoMute(state, data){
//       state.videoMute = data
//       state.videoUnmute = false
//   },
//   SOCKET_videoUnmute(state, data){
//       state.videoMute = false
//       state.videoUnmute = data
//   },
//   SOCKET_audioMute(state, data){
//       state.audioMute = data
//       state.audioUnmute = false
//   },
//   SOCKET_audioUnmute(state, data){
//       state.audioMute = false
//       state.audioUnmute = data
//   },
// }
