#include <iostream>

using namespace std;

int main() {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0), cout.tie(0);

  /* Variables*/
  int a = 0, b = 0;

  /* Input */
  while (true) {
    cin >> a >> b;

    if (a == 0 && b == 0) break;

    cout << (a > b ? "Yes" : "No") << '\n';
  }

  /* Return */
  return 0;
}
