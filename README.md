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

- とても謙虚になれる
- nodeでインタラクティブ問題は標準出力をflushできないので厳しそう (rust or goの機運)
- `reader.on('line', (line)` よりも `process.stdin.on('data'` の方がローカルで動かしやすい
- 入出力例だけだと不十分なためテストコードも必要
- 簡単な問題はchatgptで雛形作ると早そう
- 難しい問題はアルゴリズム勉強したほうが効率良さそう

## 候補

- Language Test 202001  
https://atcoder.jp/contests/language-test-202001/tasks  
- 京セラプログラミングコンテスト2023(AtCoder Beginner Contest 305)  
https://atcoder.jp/contests/abc305  
- leetcode.com (atcodeではない)  
https://leetcode.com/
