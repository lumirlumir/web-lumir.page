#ifndef __SORT_C_H__
#define __SORT_C_H__

#include <stdio.h>
#include <stdlib.h>

static void merge_merge(int A[], int left, int middle, int right) {
  int i = left;
  int j = middle + 1;
  int t = 0;
  int* temp = (int*)calloc(right - left + 1, sizeof(int));

  while (i <= middle && j <= right) {
    if (A[i] <= A[j])
      temp[t++] = A[i++];
    else
      temp[t++] = A[j++];
  }

  while (i <= middle) temp[t++] = A[i++];
  while (j <= right) temp[t++] = A[j++];

  i = left, t = 0;
  while (i <= right) A[i++] = temp[t++];

  free(temp);
}

void merge_sort(int A[], int left, int right) {
  if (left < right) {
    int middle = (left + right) / 2;
    merge_sort(A, left, middle);
    merge_sort(A, middle + 1, right);
    merge_merge(A, left, middle, right);
  }
}

int quick_partition(int A[], int left, int right) {
  int pivot = A[right];
  int i = left - 1;

  for (int j = left; j <= right - 1; j++) {
    if (A[j] <= pivot) {
      i += 1;
      int temp = A[i];
      A[i] = A[j];
      A[j] = temp;
    }
  }
  int temp = A[i + 1];
  A[i + 1] = A[right];
  A[right] = temp;

  return i + 1;
}

void quick_sort(int A[], int left, int right) {
  if (left < right) {
    int p = quick_partition(A, left, right);
    quick_sort(A, left, p - 1);
    quick_sort(A, p + 1, right);
  }
}

void down_heap(int A[], int i, int n) {
  int left = 2 * i + 1;
  int right = 2 * i + 2;
  int largest = i;
  int temp = 0;

  if (left < n) {
    if (A[left] > A[largest]) largest = left;
  }
  if (right < n) {
    if (A[right] > A[largest]) largest = right;
  }
  if (largest != i) {
    temp = A[i];
    A[i] = A[largest];
    A[largest] = temp;
    down_heap(A, largest, n);
  }
}

void heap_sort(int A[], int n) {
  for (int i = (n - 1) / 2; i >= 0; i--) down_heap(A, i, n);

  for (int i = n - 1; i >= 1; i--) {
    int temp = A[0];
    A[0] = A[i];
    A[i] = temp;
    down_heap(A, 0, i);
  }
}

void print_sort(int arr[], int n) {
  for (int i = 0; i < n; i++) printf("%d ", arr[i]);
  printf("\n");
}

#endif
