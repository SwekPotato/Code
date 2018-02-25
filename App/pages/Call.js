import React from 'react'
import WebRTC from 'react-native-webrtc'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    getUserMedia,
} = WebRTC

const configuration = {
    "iceServers": [{ "url": "stun:stun.l.google.com:19302" }]
}
const peerConnection = new RTCPeerConnection(configuration)

class Call extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoURL: null,
        }
    }

//     async componentWillMount() {
//         let isFront = true
//         const devices = await MediaStreamTrack.getSources()
//         console.log('Sources', devices)
//         let videoSourceId
//         for(const sourceInfos of devices) {
//             for (const sourceInfo of sourceInfos) {
//                 console.log("sourceInfo: ", sourceInfo)
//                 if (sourceInfo.kind === "video" && sourceInfo.facing === (isFront ? "front" : "back")) {
//                     videoSourceId = sourceInfo.id
//                 }
//             }
//         }

//         try {
//             const stream = await getUserMedia({
//                 audio: true,
//                 video: {
//                     mandatory: {
//                         minWidth: 500, // Provide your own width, height and frame rate here
//                         minHeight: 300,
//                         minFrameRate: 30
//                     },
//                     facingMode: (isFront ? "user" : "environment"),
//                     optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
//                 }
//             })
//             console.log('Successfully acquired a mediaStream', stream)
//             console.log("Stream URL: ", stream.toURL())
//             this.setState({ videoURL: stream.toURL() })
//         } catch (err) {
//             console.log(err)
//         }

//         try {
//             const sessionsDescription = await peerConnection.createOffer()
//             await peerConnection.setLocalDescription(sessionsDescription)
//             console.log('Done setting the local description')
//             // Send peerConnection.localDescription to peer
    
//             peerConnection.onicecandidate = (event) => {
//                 console.log('onIceCandidaste', event)
//                 // send event.candidate to peer
//             }
//         } catch (err) {
//             console.error(err)
//         }
//         // also support setRemoteDescription, createAnswer, addIceCandidate, onnegotiationneeded, oniceconnectionstatechange, onsignalingstatechange, onaddstream
//     }

    render() {
        console.log("videoURL: ", this.state.videoURL)
        return (
            <View>
                <RTCView streamURL={this.state.videoURL} style={styles.callView}/>
            </View>
        )
    }
}

Call.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="phone" size={30} color={tintColor} />
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    callView: {
        width: 375,
        height: 600,
    }
})

export default Call