import React from "react";
import "./show-album.css";

interface Props {
  albumName: string;
}

const ShowAlbum: React.FC<Props> = ({ albumName }) => {
  return (
    <div className="album-container">
      <div className="album-name">{albumName}</div>
    </div>
  );
};

export default ShowAlbum;
