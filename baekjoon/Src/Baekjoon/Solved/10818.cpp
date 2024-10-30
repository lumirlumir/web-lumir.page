#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char* argv[]) {
  int N, max, min = 0;

  scanf("%d", &N);
  int* arr = (int*)calloc(N, sizeof(int));

  for (int i = 0; i < N; i++)
    scanf("%d", &arr[i]);

  max = arr[0];
  for (int i = 1; i < N; i++)
    if (max < arr[i])
      max = arr[i];

  min = arr[0];
  for (int i = 1; i < N; i++)
    if (min > arr[i])
      min = arr[i];

  printf("%d %d", min, max);

  free(arr);

  return 0;
}
