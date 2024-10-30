#include <iostream>
#include <string>
using namespace std;

class queue {
 private:
  int* arr;

  int F;
  int R;

  const int max = 10001;

 public:
  /* Constructor & Destructor */
  queue() : F(0), R(0) {
    arr = new int[max]();
  }
  ~queue() {
    delete[] arr;
  }
  /* Method */
  void push(int elem) {
    arr[++R] = elem;
  }
  int pop(void) {
    if (F == R)
      return -1;
    else
      return arr[++F];
  }
  int size(void) {
    return R - F;
  }
  int empty(void) {
    if (F == R)
      return 1;
    else
      return 0;
  }
  int front(void) {
    if (F == R)
      return -1;
    else
      return arr[F + 1];
  }
  int back(void) {
    if (F == R)
      return -1;
    else
      return arr[R];
  }
};

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  queue q;

  /* Input */
  int N;
  cin >> N;
  for (int i = 0; i < N; i++) {
    string str;
    cin >> str;

    if (str == "push") {
      int elem;
      cin >> elem;
      q.push(elem);
    } else if (str == "pop") {
      cout << q.pop() << '\n';
    } else if (str == "size") {
      cout << q.size() << '\n';
    } else if (str == "empty") {
      cout << q.empty() << '\n';
    } else if (str == "front") {
      cout << q.front() << '\n';
    } else if (str == "back") {
      cout << q.back() << '\n';
    }
  }

  /* End */
  return 0;
}

/* 원형 큐 이용 안함 */
