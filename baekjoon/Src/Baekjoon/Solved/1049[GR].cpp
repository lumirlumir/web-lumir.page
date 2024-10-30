#pragma warning(disable : 4996)
#include <climits>
#include <cstdio>
#include <iostream>
using namespace std;

int find_min(int arr[], int len) {
  int min = INT_MAX;

  for (int i = 0; i < len; i++)
    if (min > arr[i]) min = arr[i];

  return min;
}

int main(int argc, char* argv[]) {
  /* Input */
  int N, M;
  scanf("%d %d", &N, &M);
  int* rem = new int[M * 2]{};  // ³¹°³ = ³ª¸ÓÁö
  int* quo = new int[M * 2]{};  // ÆĞÅ°Áö = ¸ò

  /* Calculation */
  for (int i = 0; i < M; i++) {
    /* Input */
    int p, s;
    scanf("%d %d", &p, &s);  // p=package, s=single

    /* ³¹°³ = ³ª¸ÓÁö */
    rem[2 * i] = p;
    rem[2 * i + 1] = s * (N % 6);

    /* ÆĞÅ°Áö = ¸ò */
    quo[2 * i] = p * (N / 6);
    quo[2 * i + 1] = s * (N / 6) * 6;
  }

  /* OUtput */
  printf("%d", find_min(rem, M * 2) + find_min(quo, M * 2));

  /* End */
  delete[] rem;
  delete[] quo;
  return 0;
}
