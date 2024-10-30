#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char* argv[]) {
  /* N, key값 입력 받음 */
  int N;
  scanf("%d", &N);
  int key;
  scanf("%d", &key);

  /* 2차원 동적배열 할당 */
  int** arr = (int**)calloc(N, sizeof(int*));
  for (int i = 0; i < N; i++)
    arr[i] = (int*)calloc(N, sizeof(int));

  /* 달팽이 채워넣기 */
  int col = N / 2;
  int row = N / 2;
  int num = 1;

  for (int i = 1; num <= N * N; i++) {
    for (int j = 1; j <= (i + 1) / 2; j++) {
      /* part1. 쓰기 */
      arr[col][row] = num++;

      /* part2. 위치 */
      /* UP */
      if (i % 4 == 1)
        col--;
      /* RIGHT */
      else if (i % 4 == 2)
        row++;
      /* DOWN */
      else if (i % 4 == 3)
        col++;
      /* LEFT */
      else if (i % 4 == 0)
        row--;
    }
  }

  /* 출력_달팽이 */
  for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++)
      printf("%d ", arr[i][j]);
    printf("\n");
  }

  /* 출력_key값 위치 */
  for (int i = 0; i < N; i++)
    for (int j = 0; j < N; j++)
      if (key == arr[i][j])
        printf("%d %d", i + 1, j + 1);

  /* 마무리 */
  for (int i = 0; i < N; i++)
    free(arr[i]);
  free(arr);

  return 0;
}
