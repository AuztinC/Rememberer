

const PlayerStats = ({ moves, bestMoves, timer, bestTime })=>{
  return (<>
    <div className="playerStats">
        <p>Moves: {moves}</p>
        <p>Time: {timer.hour}:{timer.minute}:{timer.second}</p>
        <p>Best Moves: {bestMoves}</p>
        <p>Best Time: {bestTime.hour}:{bestTime.minute}:{bestTime.second}</p>
    </div>
    </>)
}
export default PlayerStats