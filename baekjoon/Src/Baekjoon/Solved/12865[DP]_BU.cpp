#pragma warning(disable : 4996)
#include <cstdio>
#define max(a, b) (((a) > (b)) ? (a) : (b))
using namespace std;

typedef struct {
  int W;
  int V;
} Item;

int table[101][100001] = {};
Item item[101] = {};

int main(int argc, char* argv[]) {
  /* Input */
  int N, K;
  scanf("%d %d", &N, &K);
  for (int i = 1; i <= N; i++)
    scanf("%d %d", &item[i].W, &item[i].V);

  /* DP */
  for (int col = 1; col <= N; col++)
    for (int row = 1; row <= K; row++)
      table[col][row] = max(
          table[col - 1][row],
          row - item[col].W >= 0 ? table[col - 1][row - item[col].W] + item[col].V : 0);

  ///* Debug */
  // for (int col = 0; col <= N; col++) {
  //	for (int row = 0; row <= K; row++) {
  //		printf("%3d", table[col][row]);
  //	}
  //	printf("\n");
  // }

  /* Output */
  printf("%d", table[N][K]);

  /* End */
  return 0;
}

/* 더욱 simple한 version */
#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
using namespace std;

int table[100001] = {};

int main(int argc, char* argv[]) {
  /* Input & DP */
  int N, K;
  scanf("%d %d", &N, &K);

  for (int i = 1; i <= N; i++) {
    int W, V;
    scanf("%d %d", &W, &V);

    for (int j = K; j >= W; j--)
      table[j] = max(table[j], table[j - W] + V);
  }

  /* Output */
  printf("%d", table[K]);

  /* End */
  return 0;
}
/* 12920 문제와 세트문제 */
