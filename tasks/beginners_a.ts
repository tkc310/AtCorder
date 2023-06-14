/* 標準入力の取得、処理起点 */
process.stdin.setEncoding("utf8");

class BeginnersA {
  constructor() {
    const readline = require("readline");
    const reader = readline.createInterface({
      input: process.stdin,
    });

    const inputs: string[] = [];
    reader.on("line", (line) => {
      // --------
      // a
      // b c
      // s
      // --------
      inputs.push(line);
    });

    reader.on("close", () => {
      const lines = inputs.map((line) => {
        return line.split(" ");
      });
      const a: number = Number(lines[0][0]);
      const b: number = Number(lines[1][0]);
      const c: number = Number(lines[1][1]);
      const s: string = lines[2][0];

      this.execute({
        a,
        b,
        c,
        s,
      });
    });
  }

  execute({
    a,
    b,
    c,
    s,
  }: {
    a: number;
    b: number;
    c: number;
    s: string;
  }): void {
    const result = `${a + b + c} ${s}`;

    console.log(result);
  }
}

new BeginnersA();
