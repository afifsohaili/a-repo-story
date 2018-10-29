import entities from 'entities';

const encodedOpeningBracketPlus = entities.encodeHTML('{+');
const encodedPlusClosingBracket = entities.encodeHTML('+}');

const additionRegex = new RegExp([
  encodedOpeningBracketPlus,
  '.*?',
  encodedPlusClosingBracket
].join(''));

export const formatForAddition = ({line, ...props}) => {
  const match = line.match(additionRegex);

  if (!match) {
    return {line};
  }
  const addedCode = match[0].substring(
    encodedOpeningBracketPlus.length,
    match[0].length - encodedPlusClosingBracket.length
  );
  const newLine = [
    line.substring(0, match.index),
    '<span class="addition">',
    addedCode,
    '</span>'
  ].join('');

  return {line: newLine, ...props};
};
