import React from 'react';

const Playlist = ({ songs, onSelect }) => {
  return (
    <div className="playlist">
      <h3 className='playlist-name'>Playlist</h3>
      <select onChange={(e) => onSelect(Number(e.target.value))} className="playlist-dropdown">
        <option value="">Select a song</option>
        {songs.map((song, index) => (
          <option key={song.id} value={index}>
            {song.title} by {song.artist}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Playlist;