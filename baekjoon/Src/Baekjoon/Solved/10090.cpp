#pragma warning(disable : 4996)
#include <cstdio>
#include <cstdlib>
#include <iostream>
#include <queue>
using namespace std;

void merge_sort(int A[], int n);
void merge_sort(int A[], int tmp[], int start, int end);
void merge_sort_merge(int A[], int tmp[], int start, int mid, int end);
void print_test(int* A, int n);

long long countcount = 0;

int main(int argc, char* argv[]) {
  int n = 0;
  scanf("%d", &n);

  int* A = (int*)calloc(n, sizeof(int));  // val 랜덤, idx 오름차순
  for (int i = 0; i < n; i++) {
    scanf("%d", &A[i]);
  }

  // print_test(A, n);//Test

  merge_sort(A, n);

  // print_test(A, n);//Test

  printf("%lld", countcount);

  return 0;
}

void merge_sort(int A[], int n) {
  int* tmp = (int*)calloc(n, sizeof(int));
  merge_sort(A, tmp, 0, n - 1);
}

void merge_sort(int A[], int tmp[], int start, int end) {
  if (start < end) {
    int mid = (start + end) / 2;
    merge_sort(A, tmp, start, mid);             // 배열의 앞부분
    merge_sort(A, tmp, mid + 1, end);           // 배열의 뒷부분
    merge_sort_merge(A, tmp, start, mid, end);  // 배열방이 1개 남았을때 되돌아옴.
  }
}

void merge_sort_merge(int A[], int tmp[], int start, int mid, int end) {
  for (int i = start; i <= end; i++) {  // 배열복사
    tmp[i] = A[i];
  }
  int part1idx = start;
  int part2idx = mid + 1;
  int idx = start;

  while (part1idx <= mid && part2idx <= end) {
    if (tmp[part1idx] <= tmp[part2idx]) {
      A[idx] = tmp[part1idx];
      part1idx++;
    } else {
      A[idx] = tmp[part2idx];
      part2idx++;
      countcount += (mid - part1idx + 1);
    }
    idx++;
  }
  for (int i = 0; i <= mid - part1idx; i++) {  // part1남은 데이터 정리.(뒤쪽데이터는 상관 없음.)
    A[idx + i] = tmp[part1idx + i];
  }
}

void print_test(int* A, int n) {
  for (int i = 0; i < n; ++i)
    printf("[%d]=%2d\n", i, A[i]);
  printf("\n");
}
