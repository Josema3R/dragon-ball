import '../App.css';
import '../styles/Characters.css'

export default function Characters(props) {
    const { characters, selectCharacter } = props;

    return (
        <div>
            <div className="characterList-container">
                {characters.map((character, index) => (
                    <div key={index} onClick={() => selectCharacter(character.id)}>
                        <div className="character-container">
                            <img src={character.image} className="character-img"  alt={character.name} />
                        </div>
                    </div>
            ))}
            </div>
        </div>
    )
}
