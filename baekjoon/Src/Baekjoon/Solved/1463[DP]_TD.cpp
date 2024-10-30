/* Header */
#pragma warning(disable : 4996)
#include <limits.h>
#include <stdio.h>

#define MIN2(a, b) (((a) < (b)) ? (a) : (b))
#define MIN3(a, b, c) (((MIN2((a), (b))) < (c)) ? (MIN2((a), (b))) : (c))

/* Global Variable */
int C[1000000] = {};  // cache

/* Function */
int F(int n) {
  if (n == 1)
    return 0;
  else if (C[n] != 0)
    return C[n];
  else
    return C[n] = MIN3((n % 3 == 0 ? F(n / 3) + 1 : INT_MAX),
                       (n % 2 == 0 ? F(n / 2) + 1 : INT_MAX), F(n - 1) + 1);
}

/* Main */
int main(int argc, char* argv[]) {
  int n;
  scanf("%d", &n);
  printf("%d", F(n));

  return 0;
}

/*
1. F(n-1)의 값은 무조건 존재하므로, INT_MAX의 값이 min값이 되는 경우는 없다.
따라서, INT_MAX의 오버플로우 문제는 생각하지 않아도 된다.

2.TD 방식은 Stack Overflow 때문에 풀이가 불가하다.
*/
