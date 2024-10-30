#pragma warning(disable : 4996)

#include <limits.h>  // 최댓값, 최솟값 정의.
#include <stdio.h>
#include <stdlib.h>

#define min(a, b) (((a) > (b)) ? (b) : (a))

int main(int argc, char* argv[]) {
  /* Input */
  int N, M;
  scanf("%d %d", &N, &M);  // N은 세로, M은 가로.
  getchar();               //'\n'을 입력버퍼에서 지움.

  /* 2차원 배열 동적할당 */
  char** arr = (char**)calloc(N, sizeof(char*));
  for (int i = 0; i < N; i++)
    arr[i] = (char*)calloc(M + 2, sizeof(char));  //'\n'과 '\0' 고려.

  /* Input */
  for (int i = 0; i < N; i++)
    fgets(arr[i], (M + 2) * sizeof(char), stdin);
  // sizeof(arr[i])를 하면, arr[i] = int형 싱글 포인터 크기인 8이 반환된다.

  /* 체스판 체크 */
  int min_num = INT_MAX;

  for (int col = 0; col <= N - 8; col++) {
    for (int row = 0; row <= M - 8; row++) {
      int W_start = 0, B_start = 0;

      /* 8 x 8 크기의 체스판 체크 */
      for (int i = col; i < col + 8; i++) {
        for (int j = row; j < row + 8; j++) {
          /* 세로+가로 인덱스 짝수 */
          if ((i + j) % 2 == 0) {
            if (arr[i][j] != 'W') W_start++;
            if (arr[i][j] != 'B') B_start++;

          }

          /* 세로+가로 인덱스 홀수 */
          else if ((i + j) % 2 == 1) {
            if (arr[i][j] != 'B') W_start++;
            if (arr[i][j] != 'W') B_start++;
          }
        }
      }

      min_num = min(min_num, min(W_start, B_start));
    }
  }

  /* 출력 */
  printf("%d", min_num);

  /* 마무리 */
  for (int i = 0; i < N; i++)
    free(arr[i]);
  free(arr);

  return 0;
}
