def fibFastLastDigit(n):
    if n <= 1:
        return n

    arr = [0 for _ in range(n+1)]
    arr[0] = 0
    arr[1] = 1

    for i in range(2, len(arr)):
        arr[i] = arr[i-1] + arr[i-2]

    ls = list(str(arr[len(arr) - 1]))
    return int(ls[-1])

def main():
    num = input()

    nth = int(num)
    
    print(fibFastLastDigit(nth))

if __name__ == "__main__":
    main()