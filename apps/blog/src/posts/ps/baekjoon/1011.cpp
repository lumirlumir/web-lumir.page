#pragma warning(disable : 4996)
#include <cmath>
#include <cstdio>
using namespace std;

int main(int argc, char* argv[]) {
  /* Input */
  int T;
  scanf("%d", &T);

  for (int i = 0; i < T; i++) {
    /* Input */
    int x, y;
    scanf("%d %d", &x, &y);
    int dist = y - x;

    printf("%d\n", (int)ceil(2 * sqrt(dist) - 1));
  }

  return 0;
}
