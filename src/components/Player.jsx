import React from 'react';
import SpotifyPlayer from './SpotifyPlayer';

const Player = ({ song, audioRef, onNext, onPrevious }) => {
  const isSpotifyLink = song.src.includes('spotify.com');

  return (
    <div className="player">
      {isSpotifyLink ? (
        <div className="spotify-player-container">
          <SpotifyPlayer trackUrl={song.src} />
        </div>
      ) : (
        <audio ref={audioRef} controls src={song.src} />
      )}

      <div className="player-controls">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
        {isSpotifyLink ? (
          <>
            <button onClick={() => alert('Download is not available for Spotify tracks')}>
              Download Spotify Song
            </button>
            <button onClick={() => window.open(song.src, '_blank')}>
              Open in Spotify
            </button>
          </>
        ) : (
          <button onClick={() => window.open(song.src, '_blank')}>
            Download
          </button>
        )}
        <button onClick={() => alert('Sharing is not available for Spotify links')} disabled={isSpotifyLink}>
          Share
        </button>
      </div>
    </div>
  );
};

export default Player;
