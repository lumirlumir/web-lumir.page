#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

void optimized_bubble_sort(int A[], int n) {
  int flag;

  for (int i = n - 1; i >= 1; i--) {
    flag = 0;
    for (int j = 0; j <= i - 1; j++) {
      if (A[j] > A[j + 1]) {
        int tmp = A[j];
        A[j] = A[j + 1];
        A[j + 1] = tmp;
        flag = 1;
      }
    }
    if (flag == 0)
      return;
  }
}

int main(void) {
  int n = 3;
  // scanf("%d", &n);

  int* A = (int*)calloc(n, sizeof(int));
  for (int i = 0; i < n; i++)
    scanf("%d", &A[i]);

  optimized_bubble_sort(A, n);

  for (int i = 0; i < n; i++)
    printf("%d ", A[i]);

  return 0;
}
