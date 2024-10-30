#pragma warning(disable : 4996)
#include <stdio.h>

int memo[501][501];
int count = 0;

int path(int m, int n) {
  if (m == 1 && n == 1) {
    count++;
    return;
  }

  else {
  }
}

int main(void) {
  int m, n;
  scanf("%d %d", &m, &n);

  for (int i = 1; i <= m; i++)
    for (int j = 1; j <= n; j++) scanf("%d", &memo[i][j]);

  for (int i = 0; i <= m; i++) {  // Test
    for (int j = 0; j <= n; j++) printf("%3d", memo[i][j]);
    printf("\n");
  }

  path(m, n);

  return 0;
}
