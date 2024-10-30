#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int N;
  scanf("%d", &N);

  for (int i = 0; i < N * 2; i++) {
    for (int j = 0; j < N; j++) {
      if ((i + j) % 2 == 0)  // 짝수 + 짝수 = 홀수 + 홀수 = 짝수
        printf("*");
      else if ((i + j) % 2 == 1)  // 홀수 + 짝수 = 홀수
        printf(" ");
    }
    printf("\n");
  }

  return 0;
}
