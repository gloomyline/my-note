/**
 * @Date:   2018-02-12T11:27:18+08:00
 * @Last modified time: 2018-02-12T14:19:54+08:00
 */
/**
 * ## Regular expression extension
 */

// ### 1. RegExp constructor
/**
 * If the first perference of a RegExp constructor is a RegExp object,
 * we will be allowed to use the second perference to assign the modifier.
 * And that, it will return a RegExp which ignore the original modifier.
 * @type {RegExp}
 */
const reg = new RegExp(/xyz/gi, 'i')
// > reg.flags
// > "i"

// ### 2. Reg method of String
/**
 * There are four methods which could be used with RegExp of String object,
 * they respectively are 'match', 'replace', 'search' and 'split'.
 *
 * They would invoke method on the instance of RegExp, in order to
 * make all of methods relative to RegExp defined in RegExp object
 *
 * String.prototype.match invoke RegExp.prototype[Symbol.match]
 * String.prototype.replace invoke RegExp.prototype[Symbol.replace]
 * String.prototype.search invoke RegExp.prototype[Symbol.search]
 * String.prototype.split invoke RegExp.prototype[Symbol.split]
 */

// ### 3. u modifier
// The u modifier indicate that the RegExp will use Unicode mode,
// in order to handle unicode string whose code is larger than '\uFFFF'.
// In a world, all of UTF-16 code would be handled correctly.

// ### 4. y modifier
// This modifier is called 'sticky' modifier, is used to match global, similar
// as 'g' modifier, next matching fllow last matching.
// The difference between them is that 'g' would match if there are some in
// the rest strings, but 'y' is needed to guarantee that match need to start
// with the first position of the rest strings, this means 'sticky'.

// ### 5. sticky property
//
// ### 6. flags property
//
// ### 7. s modifier: datAll mode and dotAll property
//
// ### 8. lookahead and loakbehind
//
//      - lookahead
//      > refer to match if x before y, like `/x(?=y)/`
//      ```
//      /\d+(?=%)/.exec('100% of US presidents have been male.')
//      > ['100']
//      // negative lookahead
//      /\d+(?!%)/.exec('That\'s all 44 of them.')
//      > ['44']
//      ```
//      - lookbehind
//      > refer to match if x behind y, like `/(?<=y)x/`, negative lookbehind
//      > like `/(?<!y)x/`
//
// ### 9. Unicode property Class
//
//      ```
//      \p{UnicodePropertyName=UnicodePropertyValue}
//      \P{...} is reversed to \p{...} matching
//      ```
//
// ### 10. Named Capture Groups
//
//      > allows to define a name for every matching groups
//      ```
//      const desStr = '1992-08-14'
//      const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})/
//      const matchObj = regex.exec(desStr)
//      matchObj.groups.year > '1992'
//      matchObj.groups.month > '08'
//      matchObj.groups.date > '14'
//      ```
// ### 11. destructing assignment and replacement
