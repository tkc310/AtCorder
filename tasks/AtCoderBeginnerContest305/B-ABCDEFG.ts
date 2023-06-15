// 問題文
// 直線上に 7 個の点 A,B,C,D,E,F,G がこの順に並んでいます。
// 隣り合う点の距離は次の通りです。

// 点 A と点 B の距離は 3
// 点 B と点 C の距離は 1
// 点 C と点 D の距離は 4
// 点 D と点 E の距離は 1
// 点 E と点 F の距離は 5
// 点 F と点 G の距離は 9

// 2 つの英大文字 p,q が与えられます。
// p,q は A,B,C,D,E,F,G のいずれかで、 p ≠ q が成り立ちます。
// 点 p と点 q の間の距離を答えてください。

// 制約
// p,q は A,B,C,D,E,F,G のいずれか
// p ≠ q

// 例: A C -> 4, G B -> 20, C F -> 10

process.stdin.setEncoding('utf8');

class ABCDEFG {
  INPUT_PATTERNS = ['A', 'B', 'C', 'D', 'E', 'D', 'E', 'F', 'G'] as const;
  // 始点からの距離 (未知のため始点A・終点Bとしておく)
  POINTS = [
    { point: 'A', distance: 0 },
    { point: 'B', distance: 3 },
    { point: 'C', distance: 4 },
    { point: 'D', distance: 8 },
    { point: 'E', distance: 9 },
    { point: 'F', distance: 14 },
    { point: 'G', distance: 23 },
  ];

  validateInput(value: string): value is (typeof this.INPUT_PATTERNS)[number] {
    return this.INPUT_PATTERNS.some((item) => item === value);
  }

  constructor() {
    // キーボード入力待ちにする
    process.stdin.resume();

    process.stdin.on('data', (chunk: string) => {
      const lines = chunk.split(' ');

      const p = lines[0] || '';
      const q = (lines[1] || '').replace(/\n|\r/g, '');

      if (
        [p, q].every((pq) => !!pq) &&
        this.validateInput(p) &&
        this.validateInput(q)
      ) {
        this.execute(p, q);
      } else {
        throw new Error('取得できてないやで');
      }
    });

    if (process.env.NODE_ENV === 'debug') {
      this.debug();
    }
  }

  execute(
    p: (typeof this.INPUT_PATTERNS)[number],
    q: (typeof this.INPUT_PATTERNS)[number]
  ) {
    const pPoint = this.POINTS.filter(
      (item) => item.point === p
    )[0] as unknown as (typeof this.POINTS)[number];
    const qPoint = this.POINTS.filter(
      (item) => item.point === q
    )[0] as unknown as (typeof this.POINTS)[number];

    const answer = Math.abs(pPoint.distance - qPoint.distance);

    if (process.env.NODE_ENV === 'debug') {
      console.log({ answer, pPoint, qPoint });
    } else {
      console.log(answer);
    }
  }

  debug() {
    const PATTERN_LENGTH = this.INPUT_PATTERNS.length;

    [...Array(PATTERN_LENGTH)].forEach((_, idx) => {
      setTimeout(() => {
        const p = this.INPUT_PATTERNS[idx];
        const q = this.INPUT_PATTERNS[idx + 1 >= PATTERN_LENGTH ? 0 : idx + 1];
        process.stdin.emit('data', `${p} ${q}\n`);
      }, 500);
    });
  }
}

new ABCDEFG();
