const PARTICIPANT_MAIN_CLASS = 'participant main';
const PARTICIPANT_CLASS = 'participant';
import { sendMessage } from './WebRTC';
import adapter from 'webrtc-adapter';
adapter
function Participant(name) {
	this.name = name;
	let container = document.createElement('span');
	container.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
	container.id = name;
	let span = document.createElement('span');
	let video = document.createElement('video');
	let text = document.createElement('textarea');
	let rtcPeer;
	
	container.appendChild(video);
	container.appendChild(text);
	container.appendChild(span);
	container.onclick = switchContainerClass;
	document.getElementById('participants').appendChild(container);

	span.appendChild(document.createTextNode(name));

	video.id = 'video-' + name;
	video.autoplay = true;
	video.controls = false;
	

	this.getElement = function() {
		return container;
	}

	this.getVideoElement = function() {
		return video;
	}
	this.getTextElement=function(){
		return text;
	}
	function switchContainerClass() {
		if (container.className === PARTICIPANT_CLASS) {
			let elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
			elements.forEach(function(item) {
					item.className = PARTICIPANT_CLASS;
				});

				container.className = PARTICIPANT_MAIN_CLASS;
			} else {
			container.className = PARTICIPANT_CLASS;
		}
	}

	function isPresentMainParticipant() {
		return ((document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length != 0);
	}

	this.offerToReceiveVideo = function(error, offerSdp, wp){
		if (error) return console.error ("sdp offer error")
		console.log('Invoking SDP offer callback function');
		let msg =  { id : "receiveVideoFrom",
				sender : name,
				sdpOffer : offerSdp
			};
		sendMessage(msg);
	}


	this.onIceCandidate = function (candidate, wp) {
		  console.log("Local candidate" + JSON.stringify(candidate));
		  console.dir("이거안되는듯?")
		  let message = {
		    id: 'onIceCandidate',
		    candidate: candidate,
		    name: name
		  };
		  sendMessage(message);
	}

	Object.defineProperty(this, 'rtcPeer', { writable: true});

	this.dispose = function() {
		console.log('Disposing participant ' + this.name);
		this.rtcPeer.dispose();
		container.parentNode.removeChild(container);
	};
}
export{
    Participant,
}