import wordsToNumbers from 'words-to-numbers'

const isValidNumber = (word, array) => {
    let wordString = handleHomonyms(word)
    let number = wordsToNumbers(wordString)
    number--;
    if (number < array.length && number >= 0) {
        return number;
    }
    return -1;
} 

function handleHomonyms(word) {       
    switch(word)
    {
        case 'to':
        case 'too':
            return 'two'
        case 'tree':
            return 'three'
        case 'for':
            return 'four'
        case 'ate':
            return 'eight'
        default:
            return word;
    }
}

export default isValidNumber
