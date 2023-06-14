type TQuery = {
  char: string;
  weight: number;
  count: number;
};

type TQueries = TQuery[];

let n: number;
let q: number;
let queryCount: number = 0;
let queries: TQueries;
let isFirst = true;

const execute = (lg?: '<' | '>'): void => {
  const initialCodePoint: number = 65; // Aのコードポイント
  if (isFirst) {
    queries = [...Array(n)].map((_, idx) => {
      const char: TQuery['char'] = String.fromCodePoint(initialCodePoint + idx);
      
      return {
        char,
        weight: 1,
        count: 0,
      };
    });
  }

  switch (lg) {
    case '>':
      queries[0].weight++;
      break;
    case '<':
      queries[1].weight++;
      break;
  }

  if (lg) {
    [queries[0], queries[1]]
      .forEach((query) => query.count++);
  }

  const isEnd = (
    // qを超えた場合
    queryCount >= q ||
    // C全て2回クエリ済みの場合は終了
    queries.every((query) => {
      return query.count >= 2;
    }));

  if (isEnd) {
    flush();

    // 軽い順にソート
    queries = queries
      .sort((a, b) => a.weight - b.weight);
    
    const output = [
      '! ',
      ...queries.map((query) => query.char),
      '\n'
    ].join('');

    process.stdout.write(output);
  } else {
    flush();

    queries = queries
      .sort((a, b) => a.count - b.count);
    
    const output = [
      '?',
      queries[0].char,
      queries[1].char,
      '\n'
    ].join(' ');
    
    queryCount++;

    process.stdout.write(output);
  }
};

/* 標準入力の取得、処理起点 */
process.stdin.setEncoding('utf8');
const readline = require('readline');

const init = async () => {
  // キーボード入力待ちにする
  process.stdin.resume();

  process.stdin.on('data', (chunk: string) => {
    const lines = chunk.split(' ');

    if (isFirst) {
      n = Number(lines[0][0]);
      q = Number(lines[0][1]);
      execute();

      isFirst = !isFirst;
    } else {
      const lg = lines[0][0] as '<' | '>';
      execute(lg);
    }
  });
};

// nodeにはflushがないらしい
const flush = () => {
  process.stdout.write('');
  console.clear();
};

init();
