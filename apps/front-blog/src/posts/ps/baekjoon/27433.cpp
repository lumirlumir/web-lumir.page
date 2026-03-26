#include <iostream>
using namespace std;

long long factorial(long long n) {
  if (n == 0)
    return 1;
  else
    return n * factorial(n - 1);
}

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  long long n;
  cin >> n;

  /* Output */
  cout << factorial(n);

  /* Return */
  return 0;
}
