#pragma warning(disable : 4996)
#include <climits>
#include <cstdio>
#include <iostream>
using namespace std;

typedef long long LL;

int min_idx(LL arr[], int e_idx) {  // idx '0'부터 'e_idx' 중에서 min_idx값을 찾음.
  int minimum = INT_MAX;
  int idx = 0;

  for (int i = 0; i <= e_idx; i++)
    if (arr[i] < minimum) {
      minimum = arr[i];
      idx = i;
    }

  return idx;
}

/*
재귀 이용시, 최악의 경우(도시의 리터 당 가격이 내림차순일때)
O(n^2)의 시간이 소요된다. (quick sort의 최악의 경우와 동일)
calculate_long을 이용하면 58점이 나온다.
*/
LL calculate_long(LL dist[], LL cost[], int e_idx) {  // e_idx = end index
  /* Exit */
  if (e_idx == 0) return 0;

  /* Init */
  LL ans = 0;                            // 정답값.
  int pivot = min_idx(cost, e_idx - 1);  // 시간복잡도 O(n)

  /* Calculate */
  for (int i = pivot; i < e_idx; i++)
    ans += cost[pivot] * dist[i];

  /* Divide and Conquer */
  return calculate_long(dist, cost, pivot) + ans;
}

/* O(n)의 시간복잡도 */
LL calculate_short(LL dist[], LL cost[], int e_idx) {
  /* Init */
  LL ans = 0;

  /* Calculate */
  for (int i = 0, cost_now = cost[0]; i < e_idx; i++) {
    ans += cost_now * dist[i];

    if (cost_now > cost[i + 1])
      cost_now = cost[i + 1];
  }

  return ans;
}

int main(int argc, char* argv[]) {
  /* Input */
  int N;
  scanf("%d", &N);

  LL* dist = new LL[N];
  for (int i = 0; i < N - 1; i++)
    scanf("%lld", &dist[i]);

  LL* cost = new LL[N];
  for (int i = 0; i < N; i++)
    scanf("%lld", &cost[i]);

  /* Output */
  // printf("%lld", calculate_long(dist, pric, N - 1)); //O(n^2)풀이
  printf("%lld", calculate_short(dist, cost, N - 1));

  /* End */
  delete[] dist;
  delete[] cost;
  return 0;
}

/*
종이, 북마크 참조.

C++ 스타일 동적할당 이용.
분할정복 방식으로 풀었다.

[접근방법]
기름값이 가장 싼 나라에서 기름을 가장 많이 넣어야 한다.

예제에서는 가격이 2인 나라에서 가장 많은 기름을 넣어야 한다.

[ans 범위]
10^9 = 10억 따라서, 10^9 * 10^9 = 10^18, 10^18 = 10경
*/
