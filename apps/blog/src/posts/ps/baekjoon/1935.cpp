#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  stack<double> val;

  int N;
  cin >> N;
  string postfix;
  cin >> postfix;
  int alphabet[26] = {};
  for (int i = 0; i < N; i++) cin >> alphabet[i];

  /* Calculation */
  for (int i = 0; i < postfix.size(); i++) {
    /* Alphatbet */
    if ('A' <= postfix[i] && postfix[i] <= 'Z') {
      val.push(alphabet[postfix[i] - 'A']);
    }
    /* Operator */
    else {
      double val1 = val.top();
      val.pop();
      double val2 = val.top();
      val.pop();

      if (postfix[i] == '*') {
        val.push(val2 * val1);
      } else if (postfix[i] == '/') {
        val.push(val2 / val1);
      } else if (postfix[i] == '+') {
        val.push(val2 + val1);
      } else if (postfix[i] == '-') {
        val.push(val2 - val1);
      }
    }
  }

  /* Output */
  cout << fixed;
  cout.precision(2);
  cout << val.top();

  /* Return */
  return 0;
}
