#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int T;
  int A[100], B[100];
  scanf("%d", &T);

  for (int i = 0; i < T; i++)
    scanf("%d %d", &A[i], &B[i]);

  for (int i = 0; i < T; i++)
    printf("%d\n", A[i] + B[i]);

  return 0;
}
