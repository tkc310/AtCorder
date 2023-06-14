// 問題文
// シカのAtCoDeerくんは二つの正整数 a,b を見つけました。 
// a と b の積が偶数か奇数か判定してください。

// 制約
// 1 ≤ a,b ≤ 10000
// a,b は整数

// 入力
// 入力は以下の形式で標準入力から与えられる。
// a b

// 出力
// 積が奇数なら Odd と、 偶数なら Even と出力せよ。

// 例: 3 4 -> Even, 1 21 -> Odd

process.stdin.setEncoding('utf8');

const init = async () => {
// キーボード入力待ちにする
  process.stdin.resume();

  process.stdin.on('data', (chunk: string) => {
    const lines = chunk.split(' ');

    const a = Number(lines[0]);
    const b = Number(lines[1]);

    if (![a, b].every((item) => !!item)) {
        throw new Error('');
    }

    const answer = (a * b) % 2 ? 'Odd' : 'Even';

    console.log(answer);
  });
};

init();
