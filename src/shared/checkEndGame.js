export const checkEndGame = (phraseStatus, maxTries, currentTries) => {

  if (!phraseStatus.includes("_") && currentTries <= maxTries) {
    console.log("checkgame win");
    return "win";}
  if (phraseStatus.includes("_") && currentTries === maxTries) {
    console.log(phraseStatus, currentTries, maxTries, "checkgame lose");
    return "lose";
  }
  console.log("checkgame continue");
  return "";
};
