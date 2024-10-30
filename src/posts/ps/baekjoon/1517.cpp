#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

long long swap = 0;

void merge(int A[], int l, int m, int r) {
  int i = l;
  int j = m + 1;
  int t = 0;
  int* tmp = (int*)calloc(r - l + 1, sizeof(int));

  while (i <= m && j <= r) {
    if (A[i] <= A[j])
      tmp[t++] = A[i++];
    else
      tmp[t++] = A[j++], swap += (m - i + 1);
  }

  // swap += (m - i + 1) * (r - m);

  while (i <= m) tmp[t++] = A[i++];
  while (j <= r) tmp[t++] = A[j++];

  for (int k = l; k <= r; k++) A[k] = tmp[k - l];

  free(tmp);
}

void merge_sort(int A[], int l, int r) {
  if (l < r) {
    int m = (l + r) / 2;

    merge_sort(A, l, m);
    merge_sort(A, m + 1, r);

    merge(A, l, m, r);
  }
}

int main(void) {
  int n;
  scanf("%d", &n);

  int* A = (int*)calloc(n, sizeof(int));
  for (int i = 0; i < n; i++) scanf("%d", &A[i]);

  merge_sort(A, 0, n - 1);

  // for (int i = 0; i < n; i++)
  //	printf("%d\n", A[i]);

  printf("%lld", swap);

  return 0;
}
