#include <stdio.h>

int main(void) {
  int N, sum = 0;
  char num[1000] = {0};

  scanf("%d", &N);
  scanf("%s", num);

  for (int i = 0; i < N; i++)
    sum += (num[i] - '0');

  printf("%d", sum);

  return 0;
}
