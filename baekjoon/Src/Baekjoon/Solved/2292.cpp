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
  int N;
  cin >> N;

  /* Calculate */
  for (int i = 1; i <= N; i++)
    q.push(i);

  while (q.size() != 1) {
    q.pop();
    q.push(q.front());
    q.pop();
  }

  cout << q.front();

  /* End */
  return 0;
}
