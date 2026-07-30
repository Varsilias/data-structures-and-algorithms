function timeRequiredToBuy(tickets: number[], k: number): number {
    let time = 0;


    // Everybody before K in the line can only Buy as much as K can can buy
    // Everyother person after that can only buy tickets[k] - 1
    // because K will defintely finish before you get to finish buying your ticket, 
    // regardless of how many ticket you intended to buy or had to buy
    for(let i = 0; i < tickets.length; i++) {
        if(i <= k) {
            time += Math.min(tickets[i], tickets[k])
        } else {
            time += Math.min(tickets[i], tickets[k] - 1)
        }
    }
    return time
};

console.log(timeRequiredToBuy([2,3,2], 2))
console.log(timeRequiredToBuy([5,1,1,1], 0))
