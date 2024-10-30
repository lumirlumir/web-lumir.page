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

/*
Á¾ÀÌ¿¡ Ç®ÀÌ Àû¾îµÒ. È­¸éÄ¸Ã³ÇØ¼­ ³ëÆ®ºÏ ¹ÙÅÁÈ­¸é¿¡ ³õ¾ÆµÒ.
*/
