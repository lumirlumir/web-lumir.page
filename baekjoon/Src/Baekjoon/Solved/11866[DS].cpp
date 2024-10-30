#include <iostream>
#include <queue>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  queue<int> q;

  /* Input */
  int n, k;
  cin >> n >> k;
  for (int i = 0; i < n; i++)
    q.push(i + 1);

  /* Josephus */
  cout << '<';

  while (true) {
    for (int i = 0; i < k - 1; i++) {
      q.push(q.front());
      q.pop();
    }

    cout << q.front();

    q.pop();

    if (q.empty())
      break;

    cout << ", ";
  }
  cout << '>';

  /* Return */
  return 0;
}

/*
요세푸스 문제와 세트 문제.
*/
