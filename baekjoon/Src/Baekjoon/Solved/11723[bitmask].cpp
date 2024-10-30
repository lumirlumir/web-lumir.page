#include <iostream>
#include <string>
using namespace std;

class set {
 private:
  int s;

 public:
  /* Constructor & Destructor */
  set() : s(0) {}
  ~set() {}
  /* Method */
  void add(int x) {
    s = s | (1 << x);
  }
  void remove(int x) {
    s = s & ~(1 << x);
  }
  bool check(int x) {
    return (s & (1 << x)) != 0;
  }
  void toggle(int x) {
    s = s ^ (1 << x);
  }
  void all(void) {
    s = 0b00000000'00011111'11111111'11111110;
  }
  void empty(void) {
    s = 0b00000000'00000000'00000000'00000000;
  }
  /* Debug */
  // int gets(void) {
  //	return s;
  // }
};

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  set s;

  /* Input */
  int m;
  cin >> m;
  while (m--) {
    /* Input */
    string str;
    cin >> str;

    /* Add */
    if (str == "add") {
      int x;
      cin >> x;
      s.add(x);
    }
    /* Remove */
    else if (str == "remove") {
      int x;
      cin >> x;
      s.remove(x);
    }
    /* Check */
    else if (str == "check") {
      int x;
      cin >> x;
      cout << s.check(x) << '\n';
    }
    /* Toggle */
    else if (str == "toggle") {
      int x;
      cin >> x;
      s.toggle(x);
    }
    /* All */
    else if (str == "all") {
      s.all();
    }
    /* Empty */
    else if (str == "empty") {
      s.empty();
    }

    /* Debug */
    // cout << "s : " << s.gets() << '\n';
  }

  /* Return */
  return 0;
}

/*
https://travelbeeee.tistory.com/451
https://www.acmicpc.net/source/60817704
*/
