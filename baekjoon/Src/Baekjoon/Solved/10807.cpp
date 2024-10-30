#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>  //동적배열 사용목적

int main(int argc, char* argv[]) {
  /* N값 입력받기 */
  int N;
  scanf("%d", &N);

  /* N개의 정수를 동적배열에 입력받기 */
  int* arr = (int*)calloc(N, sizeof(int));
  for (int i = 0; i < N; i++)
    scanf("%d", &arr[i]);

  /* v값 입력받기 */
  int v;
  scanf("%d", &v);

  /* 배열에서 v값의 개수 찾기 */
  int count = 0;
  for (int i = 0; i < N; i++)
    if (arr[i] == v)
      count++;

  /* 출력 */
  printf("%d", count);

  /* 마무리 */
  free(arr);
  return 0;
}
