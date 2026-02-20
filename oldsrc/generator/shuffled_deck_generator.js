function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  // While there are remaining elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export default function * (list) {
  let index = 0
  shuffle(list)

  while (list) {
    if (index >= list.length) {
      shuffle(list)
      index = 0
    }

    yield list[index++]
  }
}
