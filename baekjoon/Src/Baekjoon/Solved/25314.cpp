#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  int N;
  cin >> N;

  /* Output */
  for (int i = 0; i < N / 4; i++)
    cout << "long ";
  cout << "int";

  /* Return */
  return 0;
}
