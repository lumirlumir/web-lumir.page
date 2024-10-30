#include <iostream>
#include <stack>
#include <string>
using namespace std;

int getoprank(char op) {
  switch (op) {
    case '*':
    case '/':
      return 2;
    case '+':
    case '-':
      return 1;
    case '(':
      return 0;
  }
  return -1;
}

string infix_to_postfix(string infix) {
  /* Init */
  stack<char> op;
  string postfix;

  /* Calculation */
  for (int i = 0; i < infix.size(); i++) {
    /* Alphabet */
    if ('A' <= infix[i] && infix[i] <= 'Z') {
      postfix.push_back(infix[i]);
    }
    /* Operator */
    else {
      /* '(' */
      if (infix[i] == '(') {
        op.push(infix[i]);
      }
      /* ')' */
      else if (infix[i] == ')') {
        while (op.top() != '(') {
          postfix.push_back(op.top());
          op.pop();
        }
        op.pop();
      }
      /* '*', '/', '+', '-' */
      else {
        while (!op.empty() && (getoprank(op.top()) >= getoprank(infix[i]))) {
          postfix.push_back(op.top());
          op.pop();
        }
        op.push(infix[i]);
      }
    }
  }

  while (!op.empty()) {
    postfix.push_back(op.top());
    op.pop();
  }

  /* Return */
  return postfix;
}

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  string str;
  getline(cin, str);

  /* Output */
  cout << infix_to_postfix(str) << '\n';

  /* Return */
  return 0;
}

/*
1918번 1935번 세트 문제.
스택 중위수식 후위수식 문제.
윤성우 자료구조 책 참고.
*/
