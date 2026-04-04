#include <cmath>
#include <iostream>
using namespace std;

bool sieve[1000001] = {true, true, false};
// false인 경우가 소수. 즉, 0과 1은 소수에서 제외된다.

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  int M, N;
  cin >> M >> N;

  /* Sieve of Eratosthenes */
  for (int i = 2; i <= (int)sqrt(N); i++)
    for (int j = 2 * i; j <= N; j += i)
      if (!sieve[j]) sieve[j] = true;

  /* Output */
  for (int i = M; i <= N; i++)
    if (!sieve[i]) cout << i << '\n';

  /* Return */
  return 0;
}

/*
에라토스테네스의 체

...
N = 100~120 : 10까지만 확인
N = 121~143 : 11까지만 확인
N = 144~168 : 12까지만 확인
N = 169~195 : 13까지만 확인
N = 196~224 : 14까지만 확인
...

*/
