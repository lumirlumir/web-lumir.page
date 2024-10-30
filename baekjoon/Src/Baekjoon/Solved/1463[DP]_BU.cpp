/* Header */
#pragma warning(disable : 4996)
#include <limits.h>
#include <stdio.h>

#define MIN2(a, b) (((a) < (b)) ? (a) : (b))
#define MIN3(a, b, c) (((MIN2((a), (b))) < (c)) ? (MIN2((a), (b))) : (c))

/* Global Variable */
int C[1000000] = {};  // cache

/* Main */
int main(int argc, char* argv[]) {
  /* 입력 */
  int n;
  scanf("%d", &n);

  /* Bottom Up = Tabulation */
  C[1] = 0;
  for (int i = 2; i <= n; i++)
    C[i] = MIN3((i % 3 == 0 ? C[i / 3] : INT_MAX),
                (i % 2 == 0 ? C[i / 2] : INT_MAX), C[i - 1]) +
           1;

  /* 출력 */
  printf("%d", C[n]);

  /* 마무리 */
  return 0;
}
