import React from 'react';

const Recommendations = ({ recommendations, onSelect }) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendations">
      <h3>Recommended for You</h3>
      <ul>
        {recommendations.map((song, index) => (
          <li key={song.id} onClick={() => onSelect(song.id - 1)}>
            {song.title} by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;