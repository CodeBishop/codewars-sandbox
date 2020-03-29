


// tokenise(String) => [ String | [ String | .. ] ] // arrays may be nested and/or empty
// tokenise("A + B * C") === [ "A", "+", "B", "*", "C" ]
// tokenise("function a(arg, arg)") === [ "function", "a", [ "arg", ",", "arg" ] ]
function tokenise(string) {
  return null;
}

tokenise("") // []
tokenise("()") // [ [] ]
tokenise("a (Word)") // [ "a", [ "Word" ] ]

tokenise("These are tokens.") // [ "These", "are", "tokens", "." ]
tokenise("add(a, b) = a + b") // [ "add", [ "a", ",", "b" ], "=", "a", "+", "b" ]
tokenise("A *(B ^& C)") // [ "A", "*", [ "B", "^&", "C" ] ]
tokenise("do $ readLine >>= putStrLn") // [ "do", "$", "readLine", ">>=", "putStrLn" ]
tokenise("A single mismatched bracket (") // null
