#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

int max(int arr[], int n) {
  int max = 0;

  for (int i = 0; i < n; i++)
    if (arr[i] > max) max = arr[i];

  return max;
}

int main(void) {
  int n, m = 0;
  double sum = 0;
  scanf("%d", &n);

  int* arrint = (int*)calloc(n, sizeof(int));
  double* arrdouble = (double*)calloc(n, sizeof(double));
  for (int i = 0; i < n; i++) scanf("%d", &arrint[i]);

  m = max(arrint, n);

  for (int i = 0; i < n; i++) {
    // printf("arr[%d] = %d\n", i, arrint[i]);
    arrdouble[i] = (double)arrint[i] / m * 100;
    // printf("arr[%lf] = %lf\n", i, arrdouble[i]);
    sum += arrdouble[i];
  }

  printf("%.3lf", (double)sum / n);

  return 0;
}
