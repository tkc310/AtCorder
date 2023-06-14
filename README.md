# AtCorder用のコード、実行環境

## Usage

```terminal
# node & npm
$ nodenv install 18.13.0
$ nodenv rehash
$ npm i

# githooks initialize (create .git/hooks/pre-push)
$ npm run githooks
```

## 教訓

- nodeでインタラクティブ問題は標準出力をflushできないので厳しそう (rust or goの機運)
- `reader.on('line', (line)` よりも `process.stdin.on('data'` の方がローカルで動かしやすい

## 候補

- Language Test 202001
https://atcoder.jp/contests/language-test-202001/tasks

