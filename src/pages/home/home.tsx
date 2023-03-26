import React, { useEffect, useState } from "react";
import { ArtistButton } from "../../components/artist-button/artist-button";
import ShowAlbum from "../../components/show-album/show-album";
import { useNavigate } from "react-router-dom";

import "./home.css";
import { baseFetchData } from "../../utils/baseFetch";

interface Props {
  isLoggedIn: boolean;
}

interface Album {
  collectionName: string;
  artistName: string;
}

const BASE_URL = "http://localhost:5001";

const Home: React.FC<Props> = ({ isLoggedIn }) => {
  const [isOver, setIsOver] = useState(false);
  const history = useNavigate();

  const [user, setUser] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    baseFetchData(`${BASE_URL}/api/users/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(({ data }) => {
        const { username, score: userscore } = data.user;
        setUser(username);
        setScore(userscore);
      })
      .catch((error) => {
        console.log(error);
        history("/login");
      });
  }, [isLoggedIn]);

  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<string[]>([]);
  useEffect(() => {
    baseFetchData(`${BASE_URL}/api/game/start`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((data) => {
      setAlbums(data.albums);
      setArtists(data.artists);
    }).catch;
  }, []);

  const handleArtistButtonClick = async (name: string) => {
    const isGuessTrue = albums.find((album) => album.artistName === name);
    if (isGuessTrue) {
      const data = await baseFetchData(`${BASE_URL}/api/game/finish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setScore(data.score);
      setIsOver(true);
      return;
    }
    if (albums.length == 1) {
      setIsOver(true);
    } else {
      const newAlbums = [...albums.slice(1)];
      setAlbums(newAlbums);
    }
  };

  !isLoggedIn && history("/login");

  return (
    <div>
      {isLoggedIn && (
        <div className="body">
          <div className="user-name">
            {user}: {score}
          </div>
          {isOver ? (
            <>
              <div className="user-name">Game Over</div>
              <button
                className="artist-button"
                onClick={() => window.location.replace("/home")}
              >
                Start New Game
              </button>
            </>
          ) : (
            <>
              <ShowAlbum albumName={albums[0] && albums[0].collectionName} />
              <div className="artist-buttons">
                {artists.map((artist, index) => (
                  <ArtistButton
                    disabled={isOver}
                    key={index}
                    name={artist}
                    onClick={() => handleArtistButtonClick(artist)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
