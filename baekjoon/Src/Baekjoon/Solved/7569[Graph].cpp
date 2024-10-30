#include <algorithm>
#include <iostream>
#include <queue>
#include <tuple>
#include <vector>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  int m, n, h;
  cin >> m >> n >> h;
  int zero = m * n * h, days = 0;

  int x[6] = {-1, 1, 0, 0, 0, 0};
  int y[6] = {0, 0, -1, 1, 0, 0};
  int z[6] = {0, 0, 0, 0, -1, 1};

  vector<vector<vector<int>>> tomato(h, vector<vector<int>>(n, vector<int>(m)));
  queue<tuple<int, int, int>> q;  // row, col, hei

  /* Input */
  for (int hei = 0; hei < h; hei++)
    for (int row = 0; row < n; row++)
      for (int col = 0; col < m; col++) {
        cin >> tomato[hei][row][col];
        if (tomato[hei][row][col] != 0) zero--;
        if (tomato[hei][row][col] == 1) q.push(make_tuple(hei, row, col));
      }

  /* BFS */
  while (!q.empty()) {
    if (zero == 0) break;

    for (int rept = (int)q.size(); rept > 0; rept--) {
      int hei, row, col;
      tie(hei, row, col) = q.front();
      q.pop();

      for (int i = 0; i < 6; i++) {
        int nhei = hei + z[i];  // 높이
        int nrow = row + y[i];  // 세로
        int ncol = col + x[i];  // 가로

        if ((0 <= nhei && nhei <= h - 1) && (0 <= nrow && nrow <= n - 1) &&
            (0 <= ncol && ncol <= m - 1))
          if (tomato[nhei][nrow][ncol] == 0) {
            q.push(make_tuple(nhei, nrow, ncol));
            tomato[nhei][nrow][ncol] = 1;
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
