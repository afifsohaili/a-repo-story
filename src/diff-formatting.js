import entities from 'entities';

const REGEX_ENCODED_OPENING_BRACKET_PLUS = entities.encodeHTML('{+');
const REGEX_ENCODED_PLUS_CLOSING_BRACKET = entities.encodeHTML('+}');
const REGEX_ENCODED_OPENING_BRACKET_MINUS = entities.encodeHTML('[-');
const REGEX_ENCODED_MINUS_CLOSING_BRACKET = entities.encodeHTML('-]');
const REGEX_OR = '|';
const REGEX_ANY_WORD = '.*?';

export const splitTokens = ({line, ...props}) => {
  const newLine = processForAddition(line);
  const newNewLine = processForDeletion(newLine);

  return {line: newNewLine};
}

const processForAddition = (line) => {
  const regex = new RegExp([
    REGEX_ENCODED_OPENING_BRACKET_PLUS,
    REGEX_ANY_WORD,
    REGEX_ENCODED_PLUS_CLOSING_BRACKET
  ].join(''), 'g')

  let match;
  const matches = [];

  while(match = regex.exec(line)) {
    matches.push(match);
  }

  const finalStr = matches.reduce((str, match) => {
    const matchWithoutBrackets = match[0].substring(
      REGEX_ENCODED_OPENING_BRACKET_PLUS.length,
      match[0].length - REGEX_ENCODED_PLUS_CLOSING_BRACKET.length
    );
    return str.replace(match, `<span class="addition">${matchWithoutBrackets}</span>`);
  }, line);
  return finalStr;
}

const processForDeletion = (line) => {
  const regex = new RegExp([
    REGEX_ENCODED_OPENING_BRACKET_MINUS,
    REGEX_ANY_WORD,
    REGEX_ENCODED_MINUS_CLOSING_BRACKET
  ].join(''), 'g')

  let match;
  const matches = [];

  while(match = regex.exec(line)) {
    matches.push(match);
  }

  const finalStr = matches.reduce((str, match) => {
    const matchWithoutBrackets = match[0].substring(
      REGEX_ENCODED_OPENING_BRACKET_MINUS.length,
      match[0].length - REGEX_ENCODED_MINUS_CLOSING_BRACKET.length
    );
    return str.replace(match, `<span class="deletion">${matchWithoutBrackets}</span>`);
  }, line);
  return finalStr;
}
