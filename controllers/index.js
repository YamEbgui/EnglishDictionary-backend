const partsOfSpeech = [
  ["n", "noun"],
  ["prep", "preposition"],
  ["a", "adjective"],
  ["v", "verb"],
  ["adv", "adverb"],
  ["p", "proverb"],
  ["interj", "interjection"],
  ["conj", "conjunction"],
  ["pron", "pronoun"],
];

//CHECK IF POS EXIST IN THE ARRAY OF POS
function checkIfExist(pos) {
  let isExist = false;
  partsOfSpeech.map((fullVersionPos) => {
    if (fullVersionPos[0] === pos || fullVersionPos[1] === pos) {
      isExist = true;
    }
  });
  return isExist;
}

//RETURN SHORT VERSION OF THE POS FROM THE POS ARRAY
function returnShortVersion(pos) {
  let shortVersion;
  partsOfSpeech.map((fullVersionPos) => {
    if (fullVersionPos[0] === pos || fullVersionPos[1] === pos) {
      shortVersion = fullVersionPos[0];
    }
  });
  return shortVersion;
}

module.exports = { returnShortVersion, checkIfExist };
