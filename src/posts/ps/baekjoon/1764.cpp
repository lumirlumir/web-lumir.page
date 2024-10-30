#include <iostream>
#include <map>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  map<string, bool> ma;

  /* Input */
  int n, m;
  cin >> n >> m;
  int count = 0;

  /* N */
  while (n--) {
    string str;
    cin >> str;
    ma.insert(make_pair(str, false));
  }

  /* M */
  while (m--) {
    string str;
    cin >> str;
    if (ma.find(str) != ma.end()) {  // 값이 존재하는 경우
      ma.find(str)->second = true;
      count++;
    }
  }

  /* Output */
  cout << count << '\n';
  for (auto i : ma)
    if (i.second) cout << i.first << '\n';

  /* Return */
  return 0;
}
