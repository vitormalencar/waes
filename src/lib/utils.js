export const getStringLengthDifference = (newValue, oldValue) =>
  newValue.length - oldValue.length;

export const findDiffPosition = (newValue, oldValue) => {
  for (let i = 0; i < oldValue.length; i++)
    if (oldValue.charAt(i) !== newValue.charAt(i)) {
      return i;
    }
  return null;
};
