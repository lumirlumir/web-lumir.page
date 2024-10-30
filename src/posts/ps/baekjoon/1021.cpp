#include <algorithm>
#include <deque>
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  deque<int> dq;
  int count = 0;

  /* Input */
  int n, m;
  cin >> n >> m;

  for (int i = 1; i <= n; i++)  // deque에는 1부터 N까지의 자연수가 순서대로 들어감.
    dq.push_back(i);

  /* Calculation */
  while (m--) {
    /* Init */
    int lr = 0;  // 2번연산(왼쪽 이동, Left Rotation)의 횟수
    int a;
    cin >> a;

    /* Calculation */
    while (true) {
      if (dq.front() == a) {
        dq.pop_front();
        break;
      } else {
        dq.push_back(dq.front());
        dq.pop_front();
        lr++;
      }
    }
    count += min(lr, (int)dq.size() + 1 - lr);
  }

  /* Output */
  cout << count;

  /* Return */
  return 0;
}
