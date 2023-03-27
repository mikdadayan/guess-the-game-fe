import React, { useState, useEffect } from "react";
import { baseFetchData } from "../../utils/baseFetch";

import "./top-players.css";

const BASE_URL = "https://guess-the-artist-api-v.onrender.com";

interface Player {
  _id: string;
  username: string;
  score: number;
}

const TopPlayers: React.FC = () => {
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  useEffect(() => {
    baseFetchData(`${BASE_URL}/api/users/top`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(({ data }) => {
      setTopPlayers(data.users);
    });
  }, []);
  return (
    <ul>
      {topPlayers &&
        topPlayers.map(({ _id, username, score }: Player) => {
          return (
            <li key={_id}>
              {username}: {score}
            </li>
          );
        })}
    </ul>
  );
};

export default TopPlayers;
