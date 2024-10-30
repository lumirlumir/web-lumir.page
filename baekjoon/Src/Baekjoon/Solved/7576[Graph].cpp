#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  int m, n;
  cin >> m >> n;
  int zero = m * n, days = 0;

  vector<pair<int, int>> idx = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};  // 상하좌우

  vector<vector<int>> tomato(n, vector<int>(m));
  queue<pair<int, int>> q;  // row, col

  /* Input */
  for (int row = 0; row < n; row++)
    for (int col = 0; col < m; col++) {
      cin >> tomato[row][col];
      if (tomato[row][col] != 0) zero--;
      if (tomato[row][col] == 1) q.push(make_pair(row, col));
    }

  /* BFS */
  while (!q.empty()) {
    if (zero == 0) break;

    for (int rept = q.size(); rept > 0; rept--) {
      int row = q.front().first;
      int col = q.front().second;
      q.pop();

      for (int i = 0; i < 4; i++) {
        int nrow = row + idx[i].first;
        int ncol = col + idx[i].second;

        if ((0 <= nrow && nrow <= n - 1) && (0 <= ncol && ncol <= m - 1))
          if (tomato[nrow][ncol] == 0) {
            q.push(make_pair(nrow, ncol));
            tomato[nrow][ncol] = 1;
            zero--;
          }
      }
    }

    days++;
  }

  /* Output */
  if (zero)
    cout << -1;
  else
    cout << days;

  /* Return */
  return 0;
}

/* Debug */
// cout << '\n';
// cout << '[' << days << "일차]\n";
// for (auto i : tomato) {
//	for (auto j : i)
//		cout << j << ' ';
//	cout << '\n';
// }
// cout << '\n';
