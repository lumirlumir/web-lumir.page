#include <iostream>
#include <queue>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  priority_queue<int, vector<int>, less<int>> pq;

  /* Input */
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    /* Input */
    int x;
    cin >> x;

    /* Calculation */
    if (x == 0) {
      if (pq.empty()) {
        cout << 0 << '\n';
      } else {
        cout << pq.top() << '\n';
        pq.pop();
      }
    } else {
      pq.push(x);
    }
  }

  /* Return */
  return 0;
}

/* 1927번, 11286번 문제와 세트 문제 */
