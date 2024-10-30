#include <iostream>
#include <unordered_map>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  unordered_map<int, int> um;

  /* Input */
  int n;
  cin >> n;
  while (n--) {
    int x;
    cin >> x;
    if (um.find(x) == um.end())  // 없는 경우
      um.insert(make_pair(x, 1));
    else  // 있는 경우
      um.find(x)->second++;
  }
  int m;
  cin >> m;
  while (m--) {
    int x;
    cin >> x;
    if (um.find(x) == um.end())  // 없는 경우
      cout << '0' << ' ';
    else
      cout << um.find(x)->second << ' ';
  }

  /* Return */
  return 0;
}

/*
https://program-rest-area.tistory.com/102
*/
