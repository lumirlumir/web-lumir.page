#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
  /* 도화지 : false=0으로 초기화 */
  bool canvas[100][100] = {};

  /* 입력_색종이 수=N */
  int N;
  scanf("%d", &N);

  for (int i = 0; i < N; i++) {
    /* 입력_행열 좌표 */
    int row, col;
    scanf("%d %d", &row, &col);

    /* 색칠하기 */
    for (int j = col; j < col + 10; j++)
      for (int k = row; k < row + 10; k++)
        canvas[j][k] = true;
  }

  /* 출력 */
  int count = 0;

  for (int i = 0; i < 100; i++)
    for (int j = 0; j < 100; j++)
      if (canvas[i][j] == true) count++;

  printf("%d", count);

  ///* debug */
  // printf("\n");
  // for (int i = 0; i < 100; i++) {
  //	for (int j = 0; j < 100; j++)
  //		printf("%d", canvas[i][j]);
  //	printf("\n");
  // }

  /* 마무리 */
  return 0;
}
