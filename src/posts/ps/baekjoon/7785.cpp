#include <iostream>
#include <set>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  set<string, greater<string>> s;

  /* Input */
  int n;
  cin >> n;
  while (n--) {
    string name, el;
    cin >> name >> el;
    if (el == "enter")
      s.insert(name);
    else if (el == "leave")
      s.erase(s.find(name));
  }

  /* Output */
  for (auto it : s) cout << it << '\n';

  /* Return */
  return 0;
}
