// В конце файла так же приведены результаты тестов
function serialize(numbers) {
    numbers.sort((a, b) => a - b);
  
    let result = '';
    let start = numbers[0];
    let end = start;
  
    for (let i = 1; i <= numbers.length; i++) {
      if (numbers[i] === end + 1) {
        end = numbers[i];
      } else {
        result += encodeRange(start, end);
        start = numbers[i];
        end = start;
      }
    }
  
    return result;
}
  
function encodeRange(start, end) {
    if (start === end) {
        return String.fromCharCode(start);
    }
    return String.fromCharCode(start) + '\u{03A9}' + String.fromCharCode(end);
}
function deserialize(serialized) {
    let numbers = [];
    let i = 0;

    while (i < serialized.length) {
        let start = serialized.charCodeAt(i);
        if (serialized[i + 1] === '\u{03A9}') {
        let end = serialized.charCodeAt(i + 2);
        for (let j = start; j <= end; j++) {
            numbers.push(j);
        }
        i += 3;
        } else {
        numbers.push(start);
        i++;
        }
    }

    return numbers;
}
function runTests() {
    const testCases = [
        {
        description: "Простые короткие, случайные - 50 чисел",
        input: generateRandomArray(50,0,300),
        },
        {
        description: "100 чисел",
        input: generateRandomArray(100,0,300),
        },
        {
        description: "500 чисел",
        input: generateRandomArray(500,0,300),
        },
        {
        description: "1000 чисел",
        input: generateRandomArray(1000,0,300),
        },
        {
        description: "Граничные - все числа из 1 знака",
        input: generateRandomArray(1000,0,9),
        },
        {
        description: "Граничные - все числа из 2 знаков",
        input: generateRandomArray(1000,10,99),
        },
        {
        description: "Граничные - все числа из 3 знаков",
        input: generateRandomArray(1000,100,300),
        },
    ];

    testCases.forEach(({ description, input }) => {
        const serialized = serialize(input);
        const deserialized = deserialize(serialized);
        const isCorrect = arraysEqual(input, deserialized);

        console.log(`Test: ${description}`);
        console.log(`Original: ${input.length} numbers`);
        console.log(`Serialized: ${serialized.length} characters`);
        console.log(`Compression ratio: ${(input.length * 3) / serialized.length}`);
        console.log(`Passed: ${isCorrect}`);
        console.log('--------------------------');
    });
}

function generateRandomArray(length, min, max) {
    const array = Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    return array;
  }

function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

runTests();


// Test: Простые короткие, случайные - 50 чисел
// Original: 50 numbers
// Serialized: 53 characters
// Compression ratio: 2.830188679245283
// Passed: true
// --------------------------
// Test: 100 чисел
// Original: 100 numbers
// Serialized: 114 characters
// Compression ratio: 2.6315789473684212
// Passed: true
// --------------------------
// Test: 500 чисел
// Original: 500 numbers
// Serialized: 561 characters
// Compression ratio: 2.6737967914438503
// Passed: true
// --------------------------
// Test: 1000 чисел
// Original: 1000 numbers
// Serialized: 1213 characters
// Compression ratio: 2.4732069249793898
// Passed: true
// --------------------------
// Test: Граничные - все числа из 1 знака
// Original: 1000 numbers
// Serialized: 1009 characters
// Compression ratio: 2.9732408325074333
// Passed: true
// --------------------------
// Test: Граничные - все числа из 2 знаков
// Original: 1000 numbers
// Serialized: 1089 characters
// Compression ratio: 2.7548209366391183
// Passed: true
// --------------------------
// Test: Граничные - все числа из 3 знаков
// Original: 1000 numbers
// Serialized: 1178 characters
// Compression ratio: 2.5466893039049237
// Passed: true
// --------------------------