function deckRevealedIncreasing(deck: number[]): number[] {
    deck.sort((a, b) => a - b)
    const n = deck.length
    const result = new Array(n)
    const queue = Array.from({ length: n }, (_, i) => i);

    for(const card of deck) {
        let idx = queue.shift() as number
        result[idx] = card
        if(queue.length > 0) {
            queue.push(queue.shift() as number)
        }
    }

   


    return result
    
};


console.log(deckRevealedIncreasing([17,13,11,2,3,5,7]))