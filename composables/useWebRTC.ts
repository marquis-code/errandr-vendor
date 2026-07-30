import { ref, computed } from 'vue'
import { useSocket } from '@/composables/useSocket'
import { useUser } from '@/composables/modules/auth/user'

export type CallState = 'idle' | 'incoming' | 'calling' | 'connected' | 'ended'

const callState = ref<CallState>('idle')
const remoteUser = ref<{ id: string, name: string, avatar?: string } | null>(null)
const isVideoCall = ref(false)
const localStream = ref<MediaStream | null>(null)
const remoteStream = ref<MediaStream | null>(null)
const isMuted = ref(false)
const isVideoOff = ref(false)

let peerConnection: RTCPeerConnection | null = null

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
}

export const useWebRTC = () => {
  const { socket } = useSocket()
  const { user } = useUser()

  const initSocketListeners = () => {
    if (!socket.value) return

    socket.value.on('call:incoming', async (data: any) => {
      if (callState.value !== 'idle') {
        // Busy
        socket.value?.emit('call:reject', { callerId: data.callerId, reason: 'busy' })
        return
      }
      remoteUser.value = { id: data.callerId, name: data.callerName, avatar: data.callerAvatar }
      isVideoCall.value = data.isVideo
      callState.value = 'incoming'
    })

    socket.value.on('call:accepted', async () => {
      if (callState.value !== 'calling') return
      callState.value = 'connected'
      await createPeerConnection()
      const offer = await peerConnection!.createOffer()
      await peerConnection!.setLocalDescription(offer)
      socket.value?.emit('webrtc:offer', {
        targetId: remoteUser.value?.id,
        callerId: user.value?._id,
        offer
      })
    })

    socket.value.on('call:rejected', () => {
      endCall(false)
    })

    socket.value.on('call:ended', () => {
      endCall(false)
    })

    socket.value.on('webrtc:offer', async (data: any) => {
      if (callState.value !== 'connected') return
      if (!peerConnection) await createPeerConnection()
      await peerConnection!.setRemoteDescription(new RTCSessionDescription(data.offer))
      const answer = await peerConnection!.createAnswer()
      await peerConnection!.setLocalDescription(answer)
      socket.value?.emit('webrtc:answer', {
        targetId: data.callerId,
        callerId: user.value?._id,
        answer
      })
    })

    socket.value.on('webrtc:answer', async (data: any) => {
      if (!peerConnection) return
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))
    })

    socket.value.on('webrtc:ice-candidate', async (data: any) => {
      if (!peerConnection) return
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
      } catch (e) {
        console.error('Error adding received ice candidate', e)
      }
    })
  }

  const createPeerConnection = async () => {
    peerConnection = new RTCPeerConnection(ICE_SERVERS)
    
    // Add local stream tracks
    if (localStream.value) {
      localStream.value.getTracks().forEach(track => {
        peerConnection?.addTrack(track, localStream.value!)
      })
    }

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      remoteStream.value = event.streams[0]
    }

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && remoteUser.value?.id) {
        socket.value?.emit('webrtc:ice-candidate', {
          targetId: remoteUser.value.id,
          callerId: user.value?._id,
          candidate: event.candidate
        })
      }
    }
  }

  const startLocalStream = async (video: boolean) => {
    try {
      localStream.value = await navigator.mediaDevices.getUserMedia({ 
        video: video, 
        audio: true 
      })
      isMuted.value = false
      isVideoOff.value = false
      return true
    } catch (e) {
      console.error('Error accessing media devices.', e)
      return false
    }
  }

  const initiateCall = async (targetId: string, targetName: string, targetAvatar: string, isVideo: boolean) => {
    if (callState.value !== 'idle') return
    const mediaSuccess = await startLocalStream(isVideo)
    if (!mediaSuccess) return

    remoteUser.value = { id: targetId, name: targetName, avatar: targetAvatar }
    isVideoCall.value = isVideo
    callState.value = 'calling'

    socket.value?.emit('call:initiate', {
      receiverId: targetId,
      callerId: user.value?._id,
      callerName: `${user.value?.firstName} ${user.value?.lastName}`,
      callerAvatar: user.value?.avatar,
      isVideo
    })
  }

  const acceptCall = async () => {
    if (callState.value !== 'incoming' || !remoteUser.value) return
    const mediaSuccess = await startLocalStream(isVideoCall.value)
    if (!mediaSuccess) {
      rejectCall()
      return
    }

    callState.value = 'connected'
    socket.value?.emit('call:accept', {
      callerId: remoteUser.value.id,
      responderId: user.value?._id
    })
    
    // We wait for the caller to send the WebRTC offer
  }

  const rejectCall = () => {
    if (!remoteUser.value) return
    socket.value?.emit('call:reject', {
      callerId: remoteUser.value.id,
      responderId: user.value?._id
    })
    endCall(false)
  }

  const endCall = (emitEvent = true) => {
    if (emitEvent && remoteUser.value) {
      socket.value?.emit('call:end', {
        targetId: remoteUser.value.id,
        senderId: user.value?._id
      })
    }

    if (localStream.value) {
      localStream.value.getTracks().forEach(track => track.stop())
    }
    if (peerConnection) {
      peerConnection.close()
    }
    
    callState.value = 'idle'
    remoteUser.value = null
    localStream.value = null
    remoteStream.value = null
    peerConnection = null
  }

  const toggleMute = () => {
    if (localStream.value) {
      const audioTrack = localStream.value.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        isMuted.value = !audioTrack.enabled
      }
    }
  }

  const toggleVideo = () => {
    if (localStream.value && isVideoCall.value) {
      const videoTrack = localStream.value.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        isVideoOff.value = !videoTrack.enabled
      }
    }
  }

  return {
    callState: computed(() => callState.value),
    remoteUser: computed(() => remoteUser.value),
    isVideoCall: computed(() => isVideoCall.value),
    localStream: computed(() => localStream.value),
    remoteStream: computed(() => remoteStream.value),
    isMuted: computed(() => isMuted.value),
    isVideoOff: computed(() => isVideoOff.value),
    initSocketListeners,
    initiateCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleVideo
  }
}
