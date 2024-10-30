#include <iostream>
using std::cin;
using std::cout;
using std::endl;

int main(void) {
  int num1;
  int num2;

  int three;
  int four;
  int five;
  int result;

  cin >> num1 >> num2;

  three = num1 * (num2 % 10);
  four = num1 * ((num2 / 10) % 10);
  five = num1 * ((num2 / 10 / 10) % 10);
  result = three + 10 * four + 100 * five;

  cout << three << endl
       << four << endl
       << five << endl
       << result << endl;

  return 0;
}
