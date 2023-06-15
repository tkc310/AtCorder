// 問題文
// 全長 100km のマラソンコースがあります。
// マラソンコースにはスタートから 5km おきに給水所が設置されており、
// スタート地点・ゴール地点とあわせて 21 箇所の給水所があります。

// x1 -> x21 - 2 -> x2

// 高橋くんは、このマラソンコースの Nkm 地点にいます。
// 高橋くんに最も近い給水所は何 km 地点の給水所か求めてください。

// x1 -> t -> x2

// この問題の制約のもとで、
// 最も近い給水所が 1 つに定まることが証明できます。

// 制約
// 0 ≤ N ≤ 100
// N は整数

// 入力
// 入力は以下の形式で標準入力から与えられる。
// N

// 出力
// 高橋くんがいる地点に最も近い給水所が何 km 地点にあるかを
// 1 行で出力せよ。

// 例: 53 -> 55, 21 -> 20, 100 -> 100

process.stdin.setEncoding('utf8');

class WaterStation {
  constructor() {
    // キーボード入力待ちにする
    process.stdin.resume();

    process.stdin.on('data', (chunk: string) => {
      const lines = chunk.split(' ');

      const n = Number(lines[0]);

      if (![n].every((item) => item === 0 || !!item)) {
        throw new Error('NaNやで');
      }

      this.execute(n);
    });

    if (process.env.NODE_ENV === 'debug') {
      this.debug();
    }
  }

  TOTAL_DISTANCE = 100;
  STATION_INTERVAL = 5;
  STATION_NUM = 21;

  execute(n: number) {
    const stations: {
      pos: number;
      idx: number;
    }[] = [...[0, this.TOTAL_DISTANCE], ...Array(this.STATION_NUM - 2)]
      .map((_, idx) => {
        return {
          pos: idx * this.STATION_INTERVAL,
          idx,
        };
      })
      .sort((a, b) => a.idx - b.idx);

    const stationDistances: {
      pos: number;
      distance: number;
    }[] = stations
      .map((item) => {
        const distance = Math.abs(item.pos - n);

        return {
          pos: item.pos,
          distance,
        };
      })
      .sort((a, b) => a.distance - b.distance);

    const answer = stationDistances[0].pos;

    if (process.env.NODE_ENV === 'debug') {
      console.log({ answer: stationDistances[0], n });
    } else {
      console.log(answer);
    }
  }

  debug() {
    // n=0~100
    [...Array(this.TOTAL_DISTANCE + 1)].forEach((_, idx) => {
      setTimeout(() => {
        process.stdin.emit('data', `${idx}\n`);
      }, 500);
    });
  }
}

new WaterStation();
