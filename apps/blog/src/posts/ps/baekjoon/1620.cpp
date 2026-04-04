#include <cctype>
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
  map<int, string> ns;
  map<string, int> sn;

  /* Input */
  int n, m;
  cin >> n >> m;
  for (int i = 1; i <= n; i++) {
    string str;
    cin >> str;

    ns.insert(make_pair(i, str));
    sn.insert(make_pair(str, i));
  }

  while (m--) {
    string str;
    cin >> str;

    if (isdigit(str.front()))
      cout << ns.find(stoi(str))->second << '\n';
    else
      cout << sn.find(str)->second << '\n';
  }

  /* Return */
  return 0;
}

/*
https://nanyoungkim.tistory.com/159
https://hagisilecoding.tistory.com/41
*/
