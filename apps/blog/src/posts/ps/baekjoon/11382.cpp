#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  long a, b, c;
  cin >> a >> b >> c;

  /* Output */
  cout << a + b + c;

  /* Return */
  return 0;
}

/* 10의 12승 = 약 2의 40승. 따라서, int로 표현할 수 있는 범위를 넘어선다. */
