const fs = require('fs');
const validWords = splitWords(fs.readFileSync(process.argv[2], "utf-8"));

const validWordsMap = arrToMap(validWords);

readStdin(function (input) {
  var inputWords = splitWords(input);
  inputWords.forEach(function (inputWord) {
    if (validWordsMap.get(inputWord)) {
      console.log(inputWord);
    } else {
      console.log("<"+inputWord+">");
    }
  });
});

function splitWords(str) {
  return str.split(/\s+/).filter(function (w) {
    return w.length > 0;
  });
}

function arrToMap(array) {
  const map = new Map()

  array.map((word, index) => {
    map.set(word, word)
  })
  return map
}

function readStdin(cb) {
  var data = "";
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      data += chunk;
    }
  });
  process.stdin.on('end', function () {
    cb(data);
  });
}