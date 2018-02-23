export default (function(){

  var rePreserveTags = /<(pre|style|script(?![^>]*?src))[^>]*>[\s\S]*?<\/\1>/gi,
      rePreserveStrings = /("|')(?:\\\1|[^\1])*?\1/g,
      reInsertStrings = /__str(\d+)__/g,
      reInsertTags = /<preserved>/g,
      
      reRemoveComments = /<!--(?!\s*?\[\s*?if)[\s\S]*?-->/gi,
      cbRemoveComments = '',

      reTrimAssignments = /(?:\s+=|=\s+)(?=[^<]*>)/g,
      cbTrimAssignments = '=',

      reTrimRight = /\s*>/g,
      cbTrimRight = '>',

      reReduceAttributeDelimiters = /\s+(?=[^<]*>)/g,
      cbReduceAttributeDelimiters = ' ',

      reEmptyTextNodes = />\s+</g,
      cbEmptyTextNodes = '><',

      reSortAttributes = /(<\w+ )([^>]*)/g,
      cbSortAttributes = function (match, tag, attributes){
        return tag + attributes.split(' ').sort().join(' ');
      },

      reSortCssClasses = /<.*?class=("|')([^\1]*)\1/gi,
      cbSortCssClasses = function (match, quote, classes) {
        var sorted = classes.split(/\s\s*/g).sort().join(' ')
        return match.replace(classes, sorted);
      };

  return function (html){
    var preservedTags = [],
        preservedStrings = [],

        cbPreserveTags = function (tag) {
          preservedTags.push(tag);
          return '<preserved>';
        },
        
        cbInsertTags = function () {
          return preservedTags.shift();
        },

        cbPreserveStrings = function (string) {
          var i = preservedStrings.length;
          preservedStrings[i] = string;
          return '__str' + i + '__';
        },

        cbInsertStrings = function (_, i) {
          return preservedStrings[+i];
        };

    return html
      .replace(rePreserveStrings, cbPreserveStrings)
      .replace(rePreserveTags, cbPreserveTags)
      .replace(reRemoveComments, cbRemoveComments)
      .replace(reTrimAssignments, cbTrimAssignments)
      .replace(reTrimRight, cbTrimRight)
      .replace(reReduceAttributeDelimiters, cbReduceAttributeDelimiters)
      .replace(reEmptyTextNodes, cbEmptyTextNodes)
      .replace(reSortAttributes, cbSortAttributes)
      .replace(reInsertTags, cbInsertTags)
      .replace(reInsertStrings, cbInsertStrings)
      .replace(reSortCssClasses, cbSortCssClasses)
      .trim()
  };
}());
