#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int n;
  scanf("%d", &n);

  /*2443번 문제*/
  for (int i = n; i >= 1; i--) {  // 여기의 1을 2로 변경해도 된다.

    /* 공백 찍기 */
    for (int j = 1; j <= n - i; j++) {
      printf(" ");
    }

    /* 별 찍기 */
    for (int j = 1; j <= (2 * i) - 1; j++) {
      printf("*");
    }

    /* 개행 */
    printf("\n");
  }

  /*2442번 문제*/
  for (int i = 2; i <= n; i++) {
    // 2442번 문제와의 차이점 : 1을 2로 변경. (∵중복되는 줄 없애기 위함.)

    /* 공백 찍기 */
    for (int j = 1; j <= n - i; j++) {
      printf(" ");
    }

    /* 별 찍기 */
    for (int j = 1; j <= (2 * i) - 1; j++) {
      printf("*");
    }

    /* 개행 */
    printf("\n");
  }

  return 0;
}
