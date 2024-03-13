
import { useEffect, useState } from 'react';
import './index.css';
import Characters from './components/Characters';

function App() {
  const [characters, setCharacters] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [characterPlayer1, setCharacterPlayer1] = useState(null);
  const [characterPlayer2, setCharacterPlayer2] = useState(null);


  useEffect(() => {
    reqApi();
  }, [])

  const reqApi = async () => {
    const dragonBallApi = await fetch('https://dragonball-api.com/api/characters?limit=25');
    const dragonBallCharacters = await dragonBallApi.json();

    setCharacters(dragonBallCharacters.items);
  }

  const reqCharacterApi = async (id) => {
    const characterApi = await fetch('https://dragonball-api.com/api/characters/' + id);
    const character = await characterApi.json();
    return character
  }

  const reqCharacterPlayer1Api = async (id) => {
    const character1 = await reqCharacterApi(id);
    setCharacterPlayer1(character1);
  }

  const reqCharacterPlayer2Api = async (id) => {
    const character2 = await reqCharacterApi(id);
    setCharacterPlayer2(character2);
  }



  const selectCharacter = (index) => {
    if (currentPlayer === 1) {
      reqCharacterPlayer1Api(index);
      setCurrentPlayer(2);
    }
    else {
      reqCharacterPlayer2Api(index);
      setCurrentPlayer(1);
    }

  }

  return (
    <div className="scenario">
       {!characterPlayer1 || !characterPlayer2 ? 
        <p className="dragon-ball-text elemento-parpadeante">Select character Player {currentPlayer}</p>
        : 
        <p className="dragon-ball-text">Ready to fight!</p>
      }
      
      <div className="selected-characters-container">
      {
        characterPlayer1 ?
          <div className="selected-character">
            <img src={characterPlayer1.image} className="char-img-selected" alt={characterPlayer1.name} />
            <p className="player-text">Player 1</p>
          </div>
          :
          <>
          </>
      }
      {
        characterPlayer2 ?
          <div className="selected-character">
            <img src={characterPlayer2.image} className="char-img-selected" alt={characterPlayer2.name} />
            <p className="player-text">Player 2</p>
          </div>
          :
          <>
          </>
      }
      </div>
      {
        characters ?
          <div className="combat-container">
            <div className="player-container">
              <Characters characters={characters} setCharacters={setCharacters} selectCharacter={selectCharacter} />
            </div>
          </div>
          :
          <></>
      }
    </div>
  );
}

export default App;
