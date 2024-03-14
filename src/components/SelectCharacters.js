import '../App.css';
import { useEffect, useState } from 'react';
import Characters from './Characters';
import { useNavigate } from "react-router-dom";

export default function SelectCharacters() {
    const [characters, setCharacters] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [characterPlayer1, setCharacterPlayer1] = useState(null);
    const [characterPlayer2, setCharacterPlayer2] = useState(null);
    const [count, setCount] = useState(null);
    const [intervalCount, setIntervalCount] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        reqApi();
        if (count !== null && count <= 0 && characterPlayer1 !== null && characterPlayer2 !== null) {
            const id1 = characterPlayer1.id;
            const id2 = characterPlayer2.id;
            clearInterval(intervalCount);
            setTimeout(() => navigate("/fights/" + id1 + "/" + id2), 5000);
        }
    }, [count, intervalCount, navigate, characterPlayer1, characterPlayer2])


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
        else if (currentPlayer === 2) {
            reqCharacterPlayer2Api(index);
            setCurrentPlayer(3);
            initializeCount(3);
        }
    }

    const initializeCount = (start) => {
        setCount(start);
        const intervalId = setInterval(() => setCount((oldCount) => oldCount - 1), 1000);
        setIntervalCount(intervalId);
    }
    return (
        <div className="scenario">
            <div>{!characterPlayer1 || !characterPlayer2 ?
                <p className="dragon-ball-text elemento-parpadeante">Select character Player {currentPlayer}</p>
                :
                <div className={count === 0 ? "dissapear-top" : ""}>
                    <p className="dragon-ball-text">Ready to fight!</p>
                    <p className="dragon-ball-text">{count}</p>
                </div>
            }

                <div className="selected-characters-container">
                    {
                        characterPlayer1 ?
                            <div className="selected-character">
                                <img src={characterPlayer1.image} className={count !== 0 ? "char-img-selected" : "char-img-fighting"} alt={characterPlayer1.name} />
                                <p className={count !== 0 ? "player-text" : "player-text-dissapear"}>Player 1</p>
                            </div>
                            :
                            <>
                            </>
                    }
                    {count === 0 ? <p className="versus-text">VS</p> : <></>}
                    {
                        characterPlayer2 ?
                            <div className="selected-character">
                                <img src={characterPlayer2.image} className={count !== 0 ? "char-img-selected" : "char-img-fighting"} alt={characterPlayer2.name} />
                                <p className={count !== 0 ? "player-text" : "player-text-dissapear"}>Player 2</p>
                            </div>
                            :
                            <>
                            </>
                    }
                </div>
                {
                    characters ?
                        <div className={count !== 0 ? "combat-container" : "dissapear-bottom"}>
                            <div className="player-container">
                                <Characters characters={characters} setCharacters={setCharacters} selectCharacter={selectCharacter} />
                            </div>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    )
}