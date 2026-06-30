const micIcon = document.querySelector('.mic-circle');
const statusText = document.querySelector('.status-bar span');
const chatBox = document.querySelector('.chat-box');
const textInput = document.getElementById('textInput');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = 'en-US';

// Variables for user info
let userName = "";
let userStatus = "";
let step = 0; // To track the conversation flow

window.onload = () => {
    // Speak the initial welcome message
    reply("Hello! I am Ellie. What is your name?");
    // Initial welcome message in chat
    addChat('Ellie', "Hello! I am Ellie. What is your name?");
};

micIcon.addEventListener('click', () => {
    recognition.start();
    statusText.innerText = 'Listening...';
});

recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.toLowerCase();
    handleInput(transcript);
};

function handleText() {
    const text = textInput.value.trim();
    if (text !== "") {
        addChat('User', text);
        handleInput(text.toLowerCase());
        textInput.value = "";
    }
}

function handleInput(input) {
    if (step === 0) {
        userName = input;
        step = 1;
        addChat('Ellie', `Nice to meet you, ${userName}. What is your profession?`);
        reply(`Nice to meet you, ${userName}. What is your profession?`);
    } else if (step === 1) {
        userStatus = input;
        step = 2;
        addChat('Ellie', `Got it. You are a ${userStatus}. How are you today? How can I help you?`);
        reply(`Got it. You are a ${userStatus}. How are you today? How can I help you?`);
    } else {
        processCommand(input);
    }
}

function processCommand(transcript) {
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
    statusText.innerText = 'Click mic to speak';
}

function addChat(sender, message) {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}
