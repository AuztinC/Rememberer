

const PlayerStats = ({ moves, bestMoves, timer, bestDateTime, difficulty, setBestMoves, setBestDateTime, bestDate })=>{

  function removeBest(){
    window.localStorage.setItem(`${difficulty}/best_time`, 0)
    window.localStorage.setItem(`${difficulty}/best_moves`, 0)
    bestDate.setHours(0);
    bestDate.setMinutes(0);
    bestDate.setSeconds(window.localStorage.getItem(`${difficulty}/best_time`)*1);
    setBestDateTime({ bestDate })
    setBestMoves(window.localStorage.getItem(`${difficulty}/best_moves`))
  }

  return (<>
    <div className="playerStats">
      <p>Moves: {moves}</p>
      <p>Time:
        {timer.date.getHours().toString().padStart(2, "0")}:
        {timer.date.getMinutes().toString().padStart(2, "0")}:
        {timer.date.getSeconds().toString().padStart(2, "0")}
      </p>
      <p>Best Moves: {!bestMoves ? 0 : bestMoves}</p>
      <p>Best Time:
        {bestDateTime.bestDate.getHours().toString().padStart(2, "0")}:
        {bestDateTime.bestDate.getMinutes().toString().padStart(2, "0")}:
        {bestDateTime.bestDate.getSeconds().toString().padStart(2, "0")}</p>
    </div>
    { bestMoves*1 !== 0  ? <button className="resetBestBtn" onClick={ removeBest }>Reset Best Stats</button> : <div></div>}
    </>)
}
export default PlayerStats