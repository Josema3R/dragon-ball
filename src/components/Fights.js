import '../App.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Fights() {
    const searchParams = useParams();
    const id1 = searchParams.id1;
    const id2 = searchParams.id2;

    const reqCharacter1Api = async (id) => {
        const characterApi = await fetch('https://dragonball-api.com/api/characters/' + id);
        const character = await characterApi.json();
        const finalCharacter = { ...character, life: 100 };
        setCharacterPlayer1(finalCharacter);
    }

    const reqCharacter2Api = async (id) => {
        const characterApi = await fetch('https://dragonball-api.com/api/characters/' + id);
        const character = await characterApi.json();
        const finalCharacter = { ...character, life: 100 };
        setCharacterPlayer2(finalCharacter);
    }

    const [characterPlayer1, setCharacterPlayer1] = useState(reqCharacter1Api(id1));
    const [characterPlayer2, setCharacterPlayer2] = useState(reqCharacter2Api(id2));


    return (
        <div className="scenario">
            <div className="figthing-container">
                {characterPlayer1 ?
                    <div className="selected-character-fight">
                        <p className="player-text">{characterPlayer1.name}</p>
                        <div className="barra" style={{ '--porcentaje': `${characterPlayer1.life}%` }}></div>
                        <img src={characterPlayer1.image} className="char-img-fighting" alt={characterPlayer1.name} />
                        <p className="player-text">Ki: {characterPlayer1.ki} - {characterPlayer1.maxKi}</p>
                        <div class="bocadillo">
                            <div class="punta"></div>
                            <div class="contenido">
                                <p className="">{characterPlayer1.description}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }
                {characterPlayer2 ?
                    <div className="selected-character-fight">
                        <p className="player-text">{characterPlayer2.name}</p>
                        <div className="barra" style={{ '--porcentaje': `${characterPlayer2.life}%` }}></div>
                        <img src={characterPlayer2.image} className="char-img-fighting" alt={characterPlayer2.name} />
                        <p className="player-text">Ki: {characterPlayer2.ki} - {characterPlayer2.maxKi}</p>
                        <div class="bocadillo">
                            <div class="punta"></div>
                            <div class="contenido">
                                <p className="">{characterPlayer2.description}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>

    )
}