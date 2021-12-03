/*

Simple util to pluralize strings (used because react-pluralize isn't actively maintained anymore and wasn't updated for 3 years - and throws dependency errors when attempting to install it with newer react versions)

(Slightly adjusted) Code found here: https://www.30secondsofcode.org/js/s/pluralize

------------------------------------------------

Examples:

  pluralize(0, 'apple'); // '0 apples'
  pluralize(1, 'apple'); // '1 apple'
  pluralize(2, 'apple'); // '2 apples'
  pluralize(2, 'person', 'people'); // '2 people'

  const PLURALS = {
    person: 'people',
    radius: 'radii'
  };
  const autoPluralize = pluralize(PLURALS);
  autoPluralize(2, 'person'); // '2 people'

*/
const pluralize = (val, word, plural = word + "s") => {
  const _pluralize = (num, word, plural = word + "s") =>
    [1, -1].includes(Number(num)) ? word : plural;
  if (typeof val === "object")
    return (num, word) => _pluralize(num, word, val[word]);
  return `${val} ${_pluralize(val, word, plural)}`;
};

export default pluralize;
