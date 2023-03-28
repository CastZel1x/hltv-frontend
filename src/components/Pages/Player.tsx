import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/style.scss';

interface IPlayer1Statistics {
  killsPerRound: number;
  deathsPerRound: number;
  rating: number;
  headshots: number;
}

interface IPlayer1Info {
  name: string;
  ign: string;
  image: string;
}

interface IPlayer2Statistics {
  killsPerRound: number;
  deathsPerRound: number;
  rating: number;
  headshots: number;
}

interface IPlayer2Info {
  name: string;
  ign: string;
  image: string;
}

const Player = () => {
  const { playername1, playername2 } = useParams<{ playername1: string, playername2: string }>();
  const [inputPlayername1, setInputPlayername1] = useState(playername1);
  const [inputPlayername2, setInputPlayername2] = useState(playername2);
  const [tempPlayername1, setTempPlayername1] = useState(playername1);
  const [tempPlayername2, setTempPlayername2] = useState(playername2);

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempPlayername1(event.target.value);
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempPlayername2(event.target.value);
  };

  const handleButtonClick = () => {
    setInputPlayername1(tempPlayername1);
    setInputPlayername2(tempPlayername2);
  };

  const [player1Statistics, setPlayer1Statistics] = useState<IPlayer1Statistics>({ killsPerRound: 0, deathsPerRound: 0, rating: 0, headshots: 0 });
  const [player2Statistics, setPlayer2Statistics] = useState<IPlayer2Statistics>({ killsPerRound: 0, deathsPerRound: 0, rating: 0, headshots: 0 });
  const [player1Info, setPlayer1Info] = useState<IPlayer1Info>({ name: '', ign: '', image: '' });
  const [player2Info, setPlayer2Info] = useState<IPlayer2Info>({ name: '', ign: '', image: '' });

  useEffect(() => {
    if (typeof inputPlayername1 === 'undefined' || typeof inputPlayername2 === 'undefined') return;
    const fetchData = async () => {
      const [statisticsResponse1, nameResponse1, ignResponse1, imageResponse1, statisticsResponse2, nameResponse2, ignResponse2, imageResponse2] = await Promise.all([
        axios.get(`http://192.168.1.164:3001/api/players/${inputPlayername1}/statistics`),
        axios.get(`http://192.168.1.164:3001/api/players/${inputPlayername1}/name`),
        axios.get(`http://192.168.1.164:3001/api/players/${inputPlayername1}/ign`),
        axios.get(`http://192.168.1.164:3001/api/players/${inputPlayername1}/image`),

        axios.get(`http://192.168.1.164:3001/api/players/${inputPlayername2}/statistics`),
        axios.get(`http://192.168.1.164:3001/api/players/${inputPlayername2}/name`),
        axios.get(`http://192.168.1.164:3001/api/players/${inputPlayername2}/ign`),
        axios.get(`http://192.168.1.164:3001/api/players/${inputPlayername2}/image`),
      ]);
      setPlayer1Statistics(statisticsResponse1.data);
      setPlayer2Statistics(statisticsResponse2.data);
      setPlayer1Info({ name: nameResponse1.data, ign: ignResponse1.data, image: imageResponse1.data });
      setPlayer2Info({ name: nameResponse2.data, ign: ignResponse2.data, image: imageResponse2.data });
    };
    fetchData();
  }, [inputPlayername1, inputPlayername2]);
  

  return (
    <div className="players_compare">
      <h1>Player Statistics Compare</h1>
      <div className='player1'>
        <img src={player1Info.image === "" ? "https://static.hltv.org/images/playerprofile/bodyshot/unknown.png" : player1Info.image} alt="Player Avatar" />
        <div className='info'>
          <p>Name: {player1Info.name}</p>
          <p>Ign: {player1Info.ign.replace(/-$/, "")}</p>
        </div>
      </div>
      <div className='statistics'>
        <p>{player1Statistics.killsPerRound} Kills per round {player2Statistics.killsPerRound}</p>
        <p>{player1Statistics.deathsPerRound} Deaths per round {player2Statistics.deathsPerRound}</p>
        <p>{player1Statistics.headshots}% Headshots {player2Statistics.headshots}%</p>
        <p>{player1Statistics.rating} Rating {player2Statistics.rating}</p>
      </div>
      <div className='player2'>
        <img src={player2Info.image === "" ? "https://static.hltv.org/images/playerprofile/bodyshot/unknown.png" : player2Info.image} alt="Player Avatar" />
        <div className='info'>
          <p>Name: {player2Info.name}</p>
          <p>Ign: {player2Info.ign.replace(/-$/, "")}</p>
        </div>
      </div>
      <div className={`inputs ${typeof inputPlayername1 && typeof inputPlayername2 !== "undefined" ? "hide" : "" }`}>
        <label>
            <input type="text" placeholder='Playername 1' value={tempPlayername1} onChange={handleInputChange1} />
        </label>
        <label>
            <input type="text" placeholder='Playername 2' value={tempPlayername2} onChange={handleInputChange2} />
          </label>
          <button onClick={handleButtonClick}>Submit</button>
      </div>
    </div>
  );
};

export default Player;