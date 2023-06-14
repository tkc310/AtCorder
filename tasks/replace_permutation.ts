const replacePermutations = ({
  permutationA,
  l,
  r,
}: {
  permutationA: number[],
  l: number,
  r: number,
}) => {
  const permutation = [...permutationA];
  const _r = r + 1;
  const target = permutation.slice(l, _r);
  const reversed = target.reverse();
  const _l = _r - l;
  permutation.splice(l, (l === 0 || _l <= 0) ? r + 1 : _l, ...reversed);

  return permutation;
};

const createSets = (permutationA: number[], range: number) => {
  // 置き換え済みの順列の配列
  const permutationsSets: number[][] = [];
  [...Array(range)]
    .forEach((_, lIdx) => {
      // lをrange回数繰り返す
      [...Array(range)]
        .forEach((_, rIdx) => {
          // 1 ≤ L ≤ R ≤ N
          if (lIdx > rIdx) return;

          let permutations: number[] = [];
          if (lIdx !== rIdx) {
            // rをrange回数繰り返す
            permutations = replacePermutations({
              permutationA,
              l: lIdx,
              r: rIdx,
            });
          } else {
            // lrが同じ場合は順列は変わらないため入力値を利用
            permutations = permutationA;
          }

          permutationsSets.push(permutations);
        });
    });

  const sorted = permutationsSets.sort();
  return sorted;
};

const execute = ({
  rangeN,
  turnK,
  permutationsA,
}: {
  rangeN: number,
  turnK: number,
  permutationsA: number[],
}): void => {
  const computableTurn = turnK - 1;
  const permutationsSets = createSets(permutationsA, rangeN);
  const answerPermutations = permutationsSets[computableTurn] || [];
  
  // "1 2 3..."
  console.log(answerPermutations.join(' '));
};

process.stdin.setEncoding("utf8");

const inputs: string[] = []; 
const reader = require("readline").createInterface({
  input: process.stdin,
});

reader.on('line', (line) => {
  inputs.push(line);
});

reader.on('close', () => {
  const line1 = inputs[0].split(' ');
  const line2 = inputs[1].split(' ');
  const permutationsA = line2.map((value) => Number(value));
  // Nが入力順列の桁数とは述べられていないため最小値を利用
  const rangeN = Math.min(permutationsA.length, Number(line1[0]));
  const turnK = Number(line1[1]);

  execute({
    permutationsA,
    rangeN,
    turnK,
  })
});
