#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
  while (true) {
    /* Init */
    int table[10001] = {};
    // table을 전역변수로 선언하면, while문 재진입시 초기화가 안된다.

    /* Input */
    int n;
    double m;
    scanf("%d %lf", &n, &m);
    int m_int = (int)(m * 100 + 0.5);

    /* Break */
    if (n == 0 && m == 0) break;

    /* DP */
    for (int i = 0; i < n; i++) {
      int c;
      double p;
      scanf("%d %lf", &c, &p);
      int p_int = (int)(p * 100 + 0.5);

      for (int j = p_int; j <= m_int; j++)
        table[j] = max(table[j], table[j - p_int] + c);
    }

    /* Output */
    printf("%d\n", table[m_int]);
  }

  /* End */
  return 0;
}

/*
double 자료형에 100을 곱해 정수로 변환시,
부동소수점 문제로 정확하지 않은 값이 반환될 수 있으므로,
0.5정도를 더해주어야 한다.
*/

/*
북마크 참조
*/
