import React, { useState, useRef } from "react";
import Playlist from "./components/Playlist";
import Player from "./components/Player";
import { FaMoon, FaSun } from 'react-icons/fa';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SpotifyPlayer from "./components/SpotifyPlayer";
import Recommendations from "./components/ Recommendations";


const App = () => {
  const [songs] = useState([
    { id: 1, title: "Baby", artist: "Justin Bieber", src: "https://phanoxug.com/upload%20folder/uploads/Baby%20by%20Justin%20Bieber%20Ft.%20Ludacris%20(Downloaded%20from%20phanoxug.com).mp3", genre: "Rock" },
    { id: 2, title: "One less lonely girl", artist: "Justin Bieber", src: "https://phanoxug.com/upload%20folder/uploads/One%20Less%20Lonely%20Girl%20by%20Justin%20Bieber%20(Downloaded%20from%20phanoxug.com).mp3", genre: "Jazz" },
    { id: 3, title: "Let me down slowly", artist: "Alec Benjamin", src: "https://www.voxnaija.com.ng/wp-content/uploads/2023/07/Alec_Benjamin_-_Let_Me_Down_Slowly.mp3", genre: "Pop" },
    { id: 4, title: "Love story", artist: "Tailor Swift", src: "https://open.spotify.com/embed/track/1vrd6UOGamcKNGnSHJQlSt", genre: "Rock" },
    { id: 5, title: "Cry", artist: "Cigarett after sex", src: "https://open.spotify.com/embed/track/3p4hRhMcb6ch8OLtATMaLw", genre: "Jazz" },
    { id: 6, title: "Californication", artist: "Red hot Chilli peppers", src: "https://open.spotify.com/embed/track/48UPSzbZjgc449aqz8bxox", genre: "Jazz" },
    { id: 7, title: "Naino ki toh baat", artist: "Prateeksha Shrivastav", src: "https://open.spotify.com/embed/track/4jYFKkprMCijQmSL04U2ix?utm_source=generator", genre: "Jazz" },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playHistory, setPlayHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const audioRef = useRef(null);

  const commands = [
    {
      command: "play *",
      callback: (songTitle) => playSongByTitle(songTitle)
    }
  ];

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const handlePlay = (index) => {
    const song = songs[index];
    speakAndPlay(`Playing ${song.title} by ${song.artist}`, index);
    setPlayHistory([...playHistory, song]);
    setCurrentSongIndex(index);
  };

  const playSongByTitle = (title) => {
    const song = songs.find(song => song.title.toLowerCase() === title.toLowerCase());
    if (song) {
      handlePlay(songs.indexOf(song));
    } else {
      speak("Sorry, I couldn't find that song.");
    }
  };

  const speakAndPlay = (text, index) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setCurrentSongIndex(index);
      if (audioRef.current) {
        audioRef.current.play().catch(error => console.log("Playback error:", error));
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    
    const femaleVoice = voices.find(voice => voice.name === 'Google US English'); 
  
    if (femaleVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = femaleVoice;
      synth.speak(utterance);
    } else {
      console.error('Desired voice not found.');
    }
  };

  const getRecommendations = () => {
    const lastPlayed = playHistory[playHistory.length - 1];
    if (!lastPlayed) return [];
    return songs.filter(song => song.genre === lastPlayed.genre && song.id !== lastPlayed.id);
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="theme-toggle">
        <button className="toggle" onClick={toggleTheme}>
          {isDarkTheme ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      
      <button className="speech-button" onClick={startListening} disabled={listening}>Start Listening</button>
      <button  className="speech-button" onClick={stopListening} disabled={!listening}>Stop Listening</button>
      <p>{transcript}</p>
      
      <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
     </div>
     
      <Recommendations 
        recommendations={getRecommendations()} 
        onSelect={handlePlay} 
      />

      {/* Conditionally Render Player or SpotifyPlayer */}
      {songs[currentSongIndex].src.includes("spotify.com") ? (
        <>
          <SpotifyPlayer trackUrl={songs[currentSongIndex].src} />
          
        </>
       
        
      ) : (
        <Player 
          song={songs[currentSongIndex]} 
          audioRef={audioRef}
          onNext={() => handlePlay((currentSongIndex + 1) % songs.length)}
          onPrevious={() => handlePlay((currentSongIndex - 1 + songs.length) % songs.length)}
        />
      )}
      
      <Playlist 
        songs={filteredSongs} 
        onSelect={handlePlay} 
      />
    </div>
  );
}

export default App;
