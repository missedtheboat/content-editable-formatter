// @param {String} String (contenteditable innerHTML) to which formatting should be applied
// Returns a function accepting an infinite number of function arguments.
// The first function argument is called with transformString's string argument.
// Subsequent arguments are called with the return value of the previous.
export function transformString(str) {
  return function transform() {
    return [...arguments].reduce((str, func) => func(str), str)
  }
}

// Removes inline instances of <div> variants
export function removeDivElements(str) {
  return str.replace(/<\/?(div)>/gi, '')
}

// Removes inline instances of <br> variants
export function removeBrElements(str) {
  return str.replace(/< ?br ?\/?>/gi, '')
}

export function removeLeadingBrElements(str) {
  const regExp = /^(< ?br ?\/?>)+/gi

  return str.replace(regExp, '')
}

export function removeTrailingBrElements(str) {
  const regExp = /(< ?br ?\/?>)+\s*$/gi

  return str.replace(regExp, '')
}

// Remove inline instances of &nbsp;, the character entity reference
// Does not remove numeric character reference
export function removeNonBreakingSpaces(str) {
  return str.replace(/&nbsp;/g, '')
}

export function removeEmptyEmphasisElements(str) {
  const regExp = /<em><\/em>/gi
  const newStr = str.replace(regExp, '')

  // Recursively handle removal of multiple empty emphasis elements, such as
  // <em><em></em></em>
  if (!!newStr.match(regExp)) {
    return removeEmptyEmphasisElements(newStr)
  }

  return newStr
}

export function removeEmptyParagraphElements(str) {
  const regExp = /<p><\/p>/gi
  const newStr = str.replace(regExp, '')

  // Recursively handle removal of multiple empty paragraph elements, such as
  // <p><p></p></p>
  if (!!newStr.match(regExp)) {
    return removeEmptyParagraphElements(newStr)
  }

  return newStr
}

export function removeEmptyStrongElements(str) {
  const regExp = /<strong><\/strong>/gi
  const newStr = str.replace(regExp, '')

  // Recursively handle removal of multiple empty strong elements, such as
  // <strong><strong></strong></strong>
  if (!!newStr.match(regExp)) {
    return removeEmptyStrongElements(newStr)
  }

  return newStr
}
