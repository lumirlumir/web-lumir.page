#pragma warning(disable : 4996)
#include <stdio.h>
typedef struct {
  int col;
  int row;
} coordinate;

int main(void) {
  int arr[9][9];
  int max = 0;
  coordinate c = {0};

  for (int i = 0; i < 9; i++)
    for (int j = 0; j < 9; j++) scanf("%d", &arr[i][j]);

  for (int i = 0; i < 9; i++)
    for (int j = 0; j < 9; j++)
      if (max < arr[i][j]) c.col = i, c.row = j, max = arr[i][j];

  printf("%d\n%d %d", max, c.col + 1, c.row + 1);

  return 0;
}
