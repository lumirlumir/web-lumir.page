#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
  /* Input */
  int N;
  scanf("%d", &N);

  /* DP */
  bool F[1001] = {0, 1, 0, 1, 1};
  for (int i = 5; i <= N; i++)
    F[i] = !(F[i - 1] && F[i - 3] && F[i - 4]);

  /* Output */
  printf("%s", F[N] == 1 ? "SK" : "CY");

  /* End */
  return 0;
}
