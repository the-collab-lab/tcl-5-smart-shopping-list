const normalizeString = (inputString) => {
    const output = inputString
    .toLowerCase()
    .replace(/[.,#!$%&;:{}=\-_`~()]/g, '')
    .trim()
    .replace(/\s{2,}/g, ' ');
    return output
}
export default normalizeString;