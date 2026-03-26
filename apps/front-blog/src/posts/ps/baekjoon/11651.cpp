#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
  int x;
  int y;
} coordinate;

void merge(coordinate A[], int l, int m, int r) {
  int i = l;
  int j = m + 1;
  int t = 0;
  coordinate* tmp = (coordinate*)calloc(r - l + 1, sizeof(coordinate));

  while (i <= m && j <= r) {
    if (A[i].y == A[j].y) {
      if (A[i].x < A[j].x)
        tmp[t++] = A[i++];
      else if (A[i].x > A[j].x)
        tmp[t++] = A[j++];
    } else {
      if (A[i].y < A[j].y)
        tmp[t++] = A[i++];
      else if (A[i].y > A[j].y)
        tmp[t++] = A[j++];
    }
  }

  while (i <= m) tmp[t++] = A[i++];
  while (j <= r) tmp[t++] = A[j++];

  for (int k = l; k <= r; k++) A[k] = tmp[k - l];

  free(tmp);
}

void merge_sort(coordinate A[], int l, int r) {
  if (l < r) {
    int m = (l + r) / 2;

    merge_sort(A, l, m);
    merge_sort(A, m + 1, r);

    merge(A, l, m, r);
  }
}

int main(void) {
  int n = 0;
  scanf("%d", &n);

  coordinate* A = (coordinate*)calloc(n, sizeof(coordinate));
  for (int i = 0; i < n; i++) scanf("%d %d", &A[i].x, &A[i].y);

  merge_sort(A, 0, n - 1);

  for (int i = 0; i < n; i++) printf("%d %d\n", A[i].x, A[i].y);

  free(A);
  return 0;
}
