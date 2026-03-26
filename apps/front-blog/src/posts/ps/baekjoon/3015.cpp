#include <algorithm>
#include <iostream>
#include <stack>
#include <vector>
using namespace std;

typedef long long ll;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init & Input */
  ll ans = 0;
  int n;
  cin >> n;

  vector<int> list(n);
  for (auto& i : list) cin >> i;
  stack<pair<int, int>> s;  // val, cnt

  /* Calculation */
  for (auto i : list) {
    int cnt = 1;

    while (!s.empty() && s.top().first <= i) {
      if (s.top().first == i) cnt += s.top().second;

      ans += s.top().second;
      s.pop();
    }

    if (!s.empty()) ans++;

    s.push(make_pair(i, cnt));
  }

  /* Output */
  cout << ans;

  /* Return */
  return 0;
}

/*
https://www.acmicpc.net/board/view/116397
https://www.acmicpc.net/board/view/108339
https://mangu.tistory.com/115
*/

#include <iostream>
#include <stack>
#include <vector>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  vector<int> list;
  int pair = 0;

  /* Input */
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    list.push_back(x);
  }

  /* Calculation */
  for (int i = 0; i < n - 1; i++) {
    if (list[i] >= list[i + 1]) {
      stack<int> s;

      s.push(list[i + 1]);
      for (int j = i + 2; j < n; j++)
        if (s.top() <= list[j]) s.push(list[j]);

      pair += s.size();
    } else {
      pair++;
    }
  }

  /* Output */
  cout << pair;

  /* Return */
  return 0;
}
