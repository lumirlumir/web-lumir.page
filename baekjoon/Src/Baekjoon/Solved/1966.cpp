#include <algorithm>
#include <iostream>
#include <queue>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  int T;
  cin >> T;
  for (int i = 0; i < T; i++) {
    /* Input */
    int N, M;
    cin >> N >> M;

    /* Init */
    int arr[10] = {};
    queue<pair<int, bool>> q;
    bool flag = false;  // 반복문 탈출을 위한 flag 변수

    for (int j = 0; j < N; j++) {
      int elem;
      cin >> elem;

      arr[elem]++;
      q.push(make_pair(elem, j == M));
    }

    /* Calculate */
    for (int j = 9; j >= 0; j--) {
      while (arr[j] > 0) {
        if (j == q.front().first) {
          if (q.front().second == true) {
            cout << N - q.size() + 1 << '\n';
            flag = true;
            break;
          }

          q.pop();
          arr[j]--;
        } else {  // j != q.front().first
          q.push(q.front());
          q.pop();
        }
      }

      if (flag == true)
        break;
    }
  }

  /* End */
  return 0;
}

/*

//debug
for (int j = 0; j < 10; j++) {
        cout.width(3);
        cout << j << ' ';
}
cout << '\n';
for (int j = 0; j < 10; j++) {
        cout.width(3);
        cout << arr[j] << ' ';
}
cout << '\n';

while (!q.empty()) {
        cout.width(3);
        cout << q.front().first << '&' << q.front().second << ' ';
        q.pop();
}
cout << '\n';

*/
