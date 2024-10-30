#include <algorithm>
#include <iostream>
#include <queue>
#include <stack>
#include <vector>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  vector<pair<bool, bool>> vertex;  // dfs, bfs
  vector<vector<int>> edge;
  stack<int> s;
  queue<int> q;

  /* Input */
  int n, m, v;
  cin >> n >> m >> v;

  vertex.resize(n + 1, pair<bool, bool>(false, false));
  edge.resize(n + 1);

  for (int i = 0; i < m; i++) {
    int n1, n2;
    cin >> n1 >> n2;

    edge[n1].push_back(n2);
    edge[n2].push_back(n1);
  }

  /* DFS */
  // 내림차순 정렬
  for (int i = 1; i < edge.size(); i++) sort(edge[i].rbegin(), edge[i].rend());

  // DFS
  s.push(v);
  while (!s.empty()) {
    int top = s.top();
    s.pop();

    if (vertex[top].first) continue;

    vertex[top].first = true;
    cout << top << ' ';

    for (auto i : edge[top])
      if (!vertex[i].first) s.push(i);
  }

  cout << '\n';

  /* BFS */
  // 오름차순 정렬
  for (int i = 1; i < edge.size(); i++) sort(edge[i].begin(), edge[i].end());

  // BFS
  q.push(v);
  while (!q.empty()) {
    int top = q.front();
    q.pop();

    if (vertex[top].second) continue;

    vertex[top].second = true;
    cout << top << ' ';

    for (auto i : edge[top])
      if (!vertex[i].second) q.push(i);
  }

  /* Return */
  return 0;
}

/* Debug : Edge */
// for (auto i : edge) {
//	for (auto j : i)
//		cout << j << ' ';
//	cout << '\n';
// }
