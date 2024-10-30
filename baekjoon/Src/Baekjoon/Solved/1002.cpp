#pragma warning(disable : 4996)  // visual studio scanf 오류 방지.
#include <math.h>                //수학함수 사용 목적.
#include <stdio.h>
#include <stdlib.h>  //abs() 함수 사용 목적.

typedef struct {
  int x;  // x좌표
  int y;  // y좌표
  int r;  // 반지름
} Circle;

double center_distance(Circle c1, Circle c2) {
  return sqrt(pow(c1.x - c2.x, 2) + pow(c1.y - c2.y, 2));
}

int positional_relationship(Circle c1, Circle c2) {
  double d = center_distance(c1, c2);  // 자료형이 double임에 주의.

  /* 1. 두 원이 일치할 때 */
  if (c1.x == c2.x && c1.y == c2.y && c1.r == c2.r) {
    return -1;
  }
  /* 2. 두 원이 일치하지 않을 때 */
  else {
    /* 2-1. 외부 = 접점 0개 */
    if (c1.r + c2.r < d)
      return 0;
    /* 2-2. 외접 = 접점 1개 */
    else if (c1.r + c2.r == d)
      return 1;
    /* 2-3. 두점에서 만남 = 접점 2개 */
    else if (abs(c1.r - c2.r) < d && d < c1.r + c2.r)
      return 2;
    /* 2-4. 내접 = 접점 1개 */
    else if (abs(c1.r - c2.r) == d)
      return 1;
    /* 2-5. 내부 = 접점 0개 */
    else if (d < abs(c1.r - c2.r))
      return 0;
    /* 2-6. 동심원 = 접점 0개 */
    else if (d == 0)
      return 0;
  }
}

int main(int argc, char* argv[]) {
  int T;
  Circle c1, c2;

  scanf("%d", &T);
  for (int i = 0; i < T; i++) {
    scanf("%d %d %d %d %d %d", &c1.x, &c1.y, &c1.r, &c2.x, &c2.y, &c2.r);

    printf("%d\n", positional_relationship(c1, c2));
  }
  return 0;
}
