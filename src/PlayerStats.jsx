

const PlayerStats = ({ moves, bestMoves, timer, bestDateTime })=>{
  return (<>
    <div className="playerStats">
        <p>Moves: {moves}</p>
        <p>Time: 
          {timer.date.getHours().toString().padStart(2, "0")}:
          {timer.date.getMinutes().toString().padStart(2, "0")}:
          {timer.date.getSeconds().toString().padStart(2, "0")}
        </p>
        <p>Best Moves: {bestMoves}</p>
        <p>Best Time: 
          {bestDateTime.bestDate.getHours().toString().padStart(2, "0")}:
          {bestDateTime.bestDate.getMinutes().toString().padStart(2, "0")}:
          {bestDateTime.bestDate.getSeconds().toString().padStart(2, "0")}</p>
    </div>
    </>)
}
export default PlayerStats