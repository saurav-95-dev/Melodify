import React, { useEffect, useRef } from 'react';

const Player = ({ song, onNext, onPrevious }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [song]);

  const downloadSong = () => {
    const link = document.createElement('a');
    link.href = song.src;
    link.download = `${song.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=Check out this song: ${song.title} - ${song.src}`;
    window.open(url, '_blank');
  };

  return (
    <div className="player">
      <h2 className='song-heading'>Now Playing: {song.title} by {song.artist}</h2>
      <audio controls src={song.src} ref={audioRef} />
      <div className="player-controls">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
        <button onClick={downloadSong}>Download</button>
        <button onClick={shareOnWhatsApp}>Share</button>
      </div>
    </div>
  );
};

export default Player;