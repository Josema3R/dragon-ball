import '../App.css';

export default function Fights(props) {
    const { characterPlayer1, characterPlayer2 } = props;

    return (
        <div className="figthing-container">
            <div className="selected-character">
                <img src={characterPlayer1.image} className="char-img-fighting" alt={characterPlayer1.name} />
            </div>
            <div className="selected-character">
                <img src={characterPlayer2.image} className="char-img-fighting" alt={characterPlayer2.name} />
            </div>
        </div>

    )
}