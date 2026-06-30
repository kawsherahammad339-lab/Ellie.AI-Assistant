const micIcon = document.querySelector('.mic-circle');
const statusText = document.querySelector('.status-bar span');
const chatBox = document.querySelector('.chat-box');
const textInput = document.getElementById('textInput');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = 'bn-BD, en-US';

micIcon.addEventListener('click', () => {
    recognition.start();
    statusText.innerText = 'Listening...';
});

recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.toLowerCase();
    addChat('User', transcript);
    processCommand(transcript);
};

function handleText() {
    const text = textInput.value.trim();
    if (text !== "") {
        addChat('User', text);
        processCommand(text.toLowerCase());
        textInput.value = "";
    }
}

function processCommand(transcript) {
    // ওয়েবসাইট ডিকশনারি
    const sites = {
        'youtube': 'https://www.youtube.com',
        'facebook': 'https://www.facebook.com',
        'google': 'https://www.google.com',
        'wikipedia': 'https://www.wikipedia.org'
    };

    let matched = false;
    for (let key in sites) {
        if (transcript.includes(key)) {
            window.open(sites[key], "_blank");
            reply("Opening " + key);
            matched = true;
            break;
        }
    }

    if (!matched) {
        window.open(`https://www.google.com/search?q=${transcript}`, "_blank");
        reply("Searching for: " + transcript);
    }
}

function reply(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
    addChat('Ellie', text);
    statusText.innerText = 'Click mic to speak';
}

function addChat(sender, message) {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}