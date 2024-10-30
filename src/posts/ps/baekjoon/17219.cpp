#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  unordered_map<string, string> sp;  // site pw

  /* Input */
  int n, m;
  cin >> n >> m;
  while (n--) {
    string site;
    cin >> site;
    string pw;
    cin >> pw;

    sp.insert(make_pair(site, pw));
  }
  while (m--) {
    string site;
    cin >> site;

    cout << sp.find(site)->second << '\n';
  }

  /* Return */
  return 0;
}
