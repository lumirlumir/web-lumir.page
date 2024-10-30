#include <algorithm>
#include <iostream>
#include <queue>
using namespace std;

struct cmp {  // priority_queue를 위한 비교 함수.
  bool operator()(const pair<int, int>& a, const pair<int, int>& b) {
    if (a.second != b.second)
      return a.second > b.second;  // val 기준 내림차순 정렬.
    else
      return a.first > b.first;  // idx 기준 내림차순 정렬.
  }
};

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  priority_queue<pair<int, int>, vector<pair<int, int>>, cmp> pq;  // idx, val

  /* Input */
  int n, l;
  cin >> n >> l;
  for (int idx = 0; idx < n; idx++) {
    /* Input */
    int val;
    cin >> val;

    /* Logic */
    pq.push(make_pair(idx, val));

    while (pq.top().first <= idx - l)
      pq.pop();

    /* Output */
    cout << pq.top().second << ' ';
  }

  /* Return */
  return 0;
}

/*
Sliding Window 알고리즘

Set 이용

[naive 풀이]
컨테이너 삽입 : O(1)
최솟값 찾기 : O(n)
컨테이너 삭제 : O(1)

[priority_queue 이용 풀이]
컨테이너 삽입 : O(logn)
최솟값 찾기 : O(1)
컨테이너 삭제 : O(logn)

*/
