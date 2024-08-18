// src/components/SpotifyPlayer.js
import React from "react";

const SpotifyPlayer = ({ trackUrl }) => {
  return (
    <div className="spotify-container">
      <iframe
        src={trackUrl}
        width="300"
        height="300"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        title="Spotify Player"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
