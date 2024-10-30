#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  int count = 0;

  /* Input */
  int n, k;
  scanf("%d %d", &n, &k);

  int* arr = (int*)calloc(n, sizeof(int));
  for (int i = n - 1; i >= 0; i--) scanf("%d", &arr[i]);

  ///* Test */
  // for (int i = 0; i < n; i++)
  //	printf("%d ", arr[i]);
  // printf("\n");

  /* Greedy */
  for (int i = 0; i < n; i++) {
    while (k - arr[i] >= 0) {
      k -= arr[i];
      count++;
      // printf("arr[%d]=%d | k=%d | count=%d\n", i, arr[i], k, count);
    }
  }

  /* Output */
  printf("%d", count);

  return 0;
}
