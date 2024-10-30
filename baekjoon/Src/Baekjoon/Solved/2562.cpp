#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  int max = 0;
  int idx = 0;
  int arr[9] = {0};

  for (int i = 0; i < 9; i++)
    scanf("%d", &arr[i]);

  max = arr[0];
  for (int i = 1; i < 9; i++)
    if (max < arr[i])
      max = arr[i];

  for (int i = 0; i < 9; i++)
    if (arr[i] == max)
      printf("%d\n%d", max, i + 1);

  return 0;
}
