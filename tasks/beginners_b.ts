/* 標準入力の取得、処理起点 */
process.stdin.setEncoding('utf8');

type TQuery = {
  char: string;
  weight: number;
  count: number;
};

type TQueries = TQuery[];

class BeginnersB {
  n: number;
  q: number;
  queryCount: number = 0;
  queries: TQueries;
  isFirst = true;

  constructor() {
    // キーボード入力待ちにする
    process.stdin.resume();

    process.stdin.on('data', (chunk: string) => {
      const lines = chunk.split(' ');

      if (this.isFirst) {
        this.n = Number(lines[0][0]);
        this.q = Number(lines[0][1]);
        this.execute();

        this.isFirst = !this.isFirst;
      } else {
        const lg = lines[0][0] as '<' | '>';
        this.execute(lg);
      }
    });
  }

  execute(lg?: '<' | '>'): void {
    const initialCodePoint: number = 65; // Aのコードポイント
    if (this.isFirst) {
      this.queries = [...Array(this.n)].map((_, idx) => {
        const char: TQuery['char'] = String.fromCodePoint(
          initialCodePoint + idx
        );

        return {
          char,
          weight: 1,
          count: 0,
        };
      });
    }

    switch (lg) {
      case '>':
        this.queries[0].weight++;
        break;
      case '<':
        this.queries[1].weight++;
        break;
    }

    if (lg) {
      [this.queries[0], this.queries[1]].forEach((query) => query.count++);
    }

    const isEnd =
      // qを超えた場合
      this.queryCount >= this.q ||
      // C全て2回クエリ済みの場合は終了
      this.queries.every((query) => {
        return query.count >= 2;
      });

    if (isEnd) {
      this.flush();

      // 軽い順にソート
      this.queries = this.queries.sort((a, b) => a.weight - b.weight);

      const output = [
        '! ',
        ...this.queries.map((query) => query.char),
        '\n',
      ].join('');

      process.stdout.write(output);
    } else {
      this.flush();

      this.queries = this.queries.sort((a, b) => a.count - b.count);

      const output = [
        '?',
        this.queries[0].char,
        this.queries[1].char,
        '\n',
      ].join(' ');

      this.queryCount++;

      process.stdout.write(output);
    }
  }

  flush() {
    process.stdout.write('');
    console.clear();
  }
}

new BeginnersB();
