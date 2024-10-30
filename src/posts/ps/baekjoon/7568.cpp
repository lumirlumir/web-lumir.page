#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

typedef struct {
  int w;
  int h;
  int rank;
} PERSON;

int main(void) {
  int w, h = 0;
  int n = 0;

  scanf("%d", &n);
  PERSON *p = (PERSON *)calloc(n, sizeof(PERSON));

  for (int i = 0; i < n; i++) {
    scanf("%d %d", &p[i].w, &p[i].h);
    p[i].rank = 1;
  }

  for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
      if (p[i].w < p[j].w && p[i].h < p[j].h) p[i].rank++;

  for (int i = 0; i < n; i++) printf("%d ", p[i].rank);

  return 0;
}
