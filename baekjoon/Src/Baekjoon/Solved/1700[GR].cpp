#pragma warning(disable : 4996)
#include <climits>
#include <cstdio>
#include <iostream>
using namespace std;

class Multitap {
 private:
  int* socket;
  int len;
  int pocnt;  // plug out count

 public:
  /* Constructer & Destructor */
  Multitap(int len) {
    socket = new int[len]{};  // 0=false로 초기화.
    this->len = len;
    pocnt = 0;
  }
  ~Multitap() { delete[] socket; }
  /* Func */
  void plugin(
      int plug) {  // 멀티탭의 빈 공간에 idx가 작은 순서부터 플러그를 꽂는다.
    for (int idx = 0; idx < len; idx++)
      if (socket[idx] == 0) {
        socket[idx] = plug;
        break;
      }
  }
  void plugout(int plug) {
    for (int idx = 0; idx < len; idx++)
      if (socket[idx] == plug) {
        socket[idx] = 0;
        break;
      }
    pocnt++;
  }
  bool isplug(int plug) const {  // 멀티탭에 plug번 plug가 꽂혀있나 여부 확인
    for (int idx = 0; idx < len; idx++)
      if (socket[idx] == plug) return true;
    return false;
  }
  bool isfull(
      void) const {  // 멀티탭이 하나라도 비어있으면 false, 꽉 차있으면 true
    for (int i = 0; i < len; i++)
      if (socket[i] == false) return false;
    return true;
  }
  int getpocnt(void) const { return pocnt; }
  int opt(int job_q[], int len, int idx) const {
    /* Init */
    int maxidx = 0;

    /* OPT */
    for (int i = 0, max = 0; i < this->len; i++) {  // i번째 socket
      int tmp = INT_MAX;

      for (int j = idx + 1; j < len; j++)
        if (socket[i] == job_q[j]) {
          tmp = j - idx;
          break;
        }

      if (max < tmp) {
        max = tmp;
        maxidx = socket[i];
      }
    }

    /* End */
    return maxidx;
  }
  /* Debug */
  void getstatus(void) const {
    printf("\nMul ");
    for (int i = 0; i < this->len; i++) printf("%d ", i);
    printf("\nPlu ");
    for (int i = 0; i < this->len; i++) printf("%d ", socket[i]);
    printf("\n\n");
  }
};

int main(int argc, char* argv[]) {
  /* Input */
  int N, K;
  scanf("%d %d", &N, &K);

  Multitap multitap(N);
  int* job_q = new int[K]{};  // 0으로 초기화.

  for (int i = 0; i < K; i++) scanf("%d", &job_q[i]);

  ///* Debug */
  // for (int i = 0; i < K; i++)
  //	printf("%2d ", i);
  // printf("\n");
  // for (int i = 0; i < K; i++)
  //	printf("%2d ", job_q[i]);
  // printf("\n\n");

  /* Scheduling */
  for (int i = 0; i < K; i++) {
    /* 멀티탭에 job_q[i]에 해당하는 플러그가 꽂혀있지 않은 경우 */
    if (!multitap.isplug(job_q[i])) {
      /* plugout */
      if (multitap.isfull())  // 멀티탭이 꽉 차있는 경우에만 plugout
        multitap.plugout(multitap.opt(job_q, K, i));

      /* plugin */
      multitap.plugin(job_q[i]);
    }

    ///* debug */
    // printf("queue : %d, pocnt : %d", job_q[i], multitap.getpocnt());
    // multitap.getstatus();
  }

  /* OUtput */
  printf("%d", multitap.getpocnt());

  /* End */
  delete[] job_q;
  return 0;
}

/*
OS의 locality에 관한 문제.
OS의 페이지 교체 알고리즘.
(이 중 가장 이상적인 알고리즘인 OPT 알고리즘을 구현하는 것이다.)
pocnt값은 결국 page fault의 발생 횟수이다.

반례
[INPUT]
2 18
1 2 3 4 3 4 3 4 3 4 1 2 1 2 1 2 1 2

[OUTPUT]
4
*/
