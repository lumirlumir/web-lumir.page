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

  /* Init */  // 상하좌우
  int dx[4] = {0, 0, -1, 1};
  int dy[4] = {-1, 1, 0, 0};

  /* Input */
  int t;
  cin >> t;

  /* BFS */
  while (t--) {
    /* Init */
    queue<pair<int, int>> q;  // 세로 가로
    int ans = 0;

    /* Input */
    int m, n, k;
    cin >> m >> n >> k;

    vector<vector<int>> map(n, vector<int>(m));
    for (int i = 0; i < k; i++) {
      int x, y;
      cin >> x >> y;
      map[y][x] = 1;
    }

    /* BFS */
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        if (map[i][j] == 1) {
          q.push(make_pair(i, j));  // 세로 가로
          ans++;
        }

        while (!q.empty()) {
          int px = q.front().second;
          int py = q.front().first;
          q.pop();

          for (int l = 0; l < 4; l++) {
            int nx = px + dx[l];
            int ny = py + dy[l];

            if (0 <= nx && nx < m && 0 <= ny && ny < n)
              if (map[ny][nx] == 1) {
                q.push(make_pair(ny, nx));
                map[ny][nx] = 0;
              }
          }
        }
      }
    }

    /* Output */
    cout << ans << '\n';
  }

  /* Return */
  return 0;
}
