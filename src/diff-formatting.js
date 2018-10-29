import entities from 'entities';

const additionRegex = /{\+.*?\+}/;
export const formatForAddition = ({line, ...props}) => {
  const additions = line.split(additionRegex);
  console.log('\n', 'additions', additions);
  const match = line.match(additionRegex);
  console.log('\n', 'match', match);

  const addedCode = match[0].substring(2, match[0].length - 2);
  const newLine = [
    '<div class="addition">',
    entities.encodeHTML(addedCode),
    '</div>'
  ].join('');

  return {line: newLine};
};
