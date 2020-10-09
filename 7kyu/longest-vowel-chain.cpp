
#include <iostream>
#include <string>

using namespace std;

bool isVowel(char c);

int main() {
    cout << "hi\n";
}

int solve(string s){
  int count = 0, max = 0;
	for (int i = 0; i < s.length(); i++) {
    count = isVowel(s[i]) ? count+1 : 0;
    max = count > max ? count : max;
  }
  return count;
}

bool isVowel(char c) {
  return c == 'a' ||
         c == 'e' ||
         c == 'i' ||
         c == 'o' ||
         c == 'u';
}  