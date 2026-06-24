def fib(n):
    if n <= 1:
        return n

    return fib(n-1) + fib(n-2)

def fibFast(n):
    if n <= 1:
        return n

    arr = [0 for _ in range(n+1)]
    arr[0] = 0
    arr[1] = 1

    for i in range(2, len(arr)):
        arr[i] = arr[i-1] + arr[i-2]

    return arr[len(arr) - 1]


def main():
    num = input()

    nth = int(num)
    
    print(fibFast(nth))

if __name__ == "__main__":
    main()