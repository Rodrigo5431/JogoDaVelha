import "./Placar.css";

export default function Placar(props) {
  return (
    <div className="placar">
      <h1 className="player">
        {props.player1} : {props.placar1}
      </h1>
      <h1 className="player">
        {props.player2} : {props.placar2}
      </h1>
    </div>
  );
}
