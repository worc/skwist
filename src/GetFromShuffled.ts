// fisher-yates shuffle
function shuffle (pool: Array<any>): void {
  let currentIndex = pool.length
  let temporaryValue
  let randomIndex

  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = pool[currentIndex];
    pool[currentIndex] = pool[randomIndex];
    pool[randomIndex] = temporaryValue;
  }
}

export function * shuffleDrainShuffle<T extends any> (pool: Array<T>): Generator<T, never, unknown> {
  let index = 0
  shuffle(pool)

  while (true) {
    if (index >= pool.length) {
      shuffle(pool)
      index = 0
    }

    yield pool[index++]
  }
}
