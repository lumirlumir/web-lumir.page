#pragma warning(disable : 4996)
#include <stdio.h>

typedef struct {
  int x;
  int y;
} Point;

// int main(int argc, char* argv[]) {
//	Point pos;
//	Point count[1001] = {};
//
//	for (int i = 0; i < 3; i++) {
//		scanf("%d %d", &pos.x, &pos.y);
//		count[pos.x].x++; count[pos.y].y++;
//	}
//
//	for (int i = 1; i <= 1000; i++)
//		if (count[i].x == 1)
//			printf("%d ", i);
//
//	for (int i = 1; i <= 1000; i++)
//		if (count[i].y == 1)
//			printf("%d", i);
//
//	return 0;
// }

int main(int argc, char* argv[]) {
  Point pos[3];

  for (int i = 0; i < 3; i++)
    scanf("%d %d", &pos[i].x, &pos[i].y);

  if (pos[0].x == pos[1].x)
    printf("%d ", pos[2].x);
  else if (pos[0].x == pos[2].x)
    printf("%d ", pos[1].x);
  else
    printf("%d ", pos[0].x);

  if (pos[0].y == pos[1].y)
    printf("%d", pos[2].y);
  else if (pos[0].y == pos[2].y)
    printf("%d", pos[1].y);
  else
    printf("%d", pos[0].y);

  return 0;
}
