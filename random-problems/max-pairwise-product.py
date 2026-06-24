def max_pairwise_product(length = 0, nums: list[int] = []):
    length = len(nums)
    if length <= 0:
        return 0
    

    idx1 = -1
    for i in range(length):
        if idx1 == -1 or nums[i] > nums[idx1]:
            idx1 = i
    
    idx2 = -1
    for i in range(length):
        if i != idx1 and (idx2 == -1 or nums[i] > nums[idx2]):
            idx2 = i

    return nums[idx1] * nums[idx2]


def main():
    length = input()
    items = input()

    items = [int(str) for str in items.split(" ")]
    length = int(length)
    
    print(max_pairwise_product(len, items))

if __name__ == "__main__":
    main()