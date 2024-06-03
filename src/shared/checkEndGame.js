export const checkEndGame = (phraseStatus, maxTries, currentTries) => {
console.log(phraseStatus, maxTries, currentTries);
  if (!phraseStatus.includes("_") && currentTries <= maxTries) {
    console.log("checkgame win");
    return "win";}
  if (phraseStatus.includes("_") && currentTries === maxTries) {
    console.log("checkgame lose");
    return "lose";
  }
  console.log("checkgame continue");
  return "";
};
