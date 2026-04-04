#include <iostream>
using std::cin;
using std::cout;
using std::endl;

int main(void) {
  int A;
  int B;

  cin >> A >> B;

  cout << A + B << endl
       << A - B << endl
       << A * B << endl
       << A / B << endl
       << A % B << endl;
  return 0;
}
