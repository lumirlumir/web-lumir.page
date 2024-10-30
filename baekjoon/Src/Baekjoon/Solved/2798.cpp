#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

#define max(a, b) (((a) > (b)) ? (a) : (b))

int main(int argc, char* argv[]) {
  /* 입력 */
  int N, M;
  scanf("%d %d", &N, &M);

  int* arr = (int*)calloc(N, sizeof(int));
  for (int i = 0; i < N; i++)
    scanf("%d", &arr[i]);

  /* 최대한 가까운 카드 3장 찾기 */
  int max_num = 0;
  for (int i = 0; i < N - 2; i++) {
    for (int j = i + 1; j < N - 1; j++) {
      for (int k = j + 1; k < N; k++) {
        /* 합이 M을 넘을 경우 */
        if (arr[i] + arr[j] + arr[k] > M)
          continue;
        max_num = max(max_num, arr[i] + arr[j] + arr[k]);
      }
    }
  }

  /* 출력 */
  printf("%d", max_num);

  /* 마무리 */
  free(arr);
  return 0;
}
