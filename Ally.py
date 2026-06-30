import datetime
from geopy.geocoders import Nominatim
import pyttsx3
import speech_recognition as sr
import webbrowser

engine = pyttsx3.init()
recognizer = sr.Recognizer()
geolocator = Nominatim(user_agent="ali_app")

def speak(text):
    print(f"Ellie: {text}") 
    engine.say(text)
    engine.runAndWait()

def get_time():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def get_location():
    try:
        location = geolocator.reverse("23.9999, 90.4203", language="en")
        return location.address if location else "Location not found"
    except Exception:
        return "Unable to fetch location"

def listen(timeout=3, phrase_time_limit=5):
    with sr.Microphone() as source:
        print("🎤 Listening...")
        try:
            audio = recognizer.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
            text = recognizer.recognize_google(audio, language="en-US").lower()
            print(f"You said: {text}") 
            return text
        except Exception:
            return ""

def get_input():
    choice = input("👉 Type 't' for text input or 'v' for voice input: ").strip().lower()
    if choice == "t":
        user_text = input("You: ")
        return user_text.lower()
    elif choice == "v":
        return listen()
    else:
        return ""

def main():
    speak("I am Ellie. Let's chat!")
    while True:
        command = get_input()
        if "time" in command:
            speak(f"The current time is {get_time()}")
        elif "location" in command:
            speak(f"Your current location is {get_location()}")
        elif "google" in command:
            speak("What do you want to search on Google?")
            search_query = get_input()
            if search_query:
                webbrowser.open(f"https://www.google.com/search?q={search_query}")
                speak(f"Searching {search_query} on Google")
        elif "youtube" in command:
            webbrowser.open("https://www.youtube.com")
            speak("Opening YouTube")
        elif "facebook" in command:
            webbrowser.open("https://www.facebook.com")
            speak("Opening Facebook")
        elif "close" in command or "exit" in command or "quit" in command:
            speak("Thank you, shutting down.")
            break

if __name__ == "__main__":
    main()
