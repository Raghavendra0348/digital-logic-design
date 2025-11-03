# 🧪 K-Map Solver - Test Cases & Verification

## Quick Test Scenarios

### ✅ Test 1: Simple 2-Variable
**Input**: 
- Variables: 2
- Minterms: 0, 1, 3
- Expected: B + A'

**K-Map**:
```
    B
    0  1
A 0 [1][1]
  1 [0][1]
```

**Groups**:
- Group 1: (0,0), (0,1) → A' (row 0)
- Group 2: (0,1), (1,1) → B (column 1)

**Result**: F = A' + B ✅

---

### ✅ Test 2: 3-Variable Wraparound
**Input**:
- Variables: 3
- Minterms: 0, 2, 4, 6
- Expected: C'

**K-Map**:
```
    BC
    00 01 11 10
A 0 [1][0][0][1]
  1 [1][0][0][1]
```

**Groups**:
- One large group: all corner cells → C' (all have C=0)

**Result**: F = C' ✅

---

### ✅ Test 3: 4-Variable with Don't Cares
**Input**:
- Variables: 4
- Minterms: 1, 3
- Don't Cares: 9, 11
- Expected: A'B'D or BD (using don't cares)

**K-Map**:
```
      CD
      00 01 11 10
AB 00 [0][1][X][0]
   01 [0][0][0][0]
   11 [0][0][0][0]
   10 [0][X][X][0]
```

**Without don't cares**: A'B'CD + A'B'C'D
**With don't cares**: B'D (if we include 9, 11)

**Result**: Should use don't cares optimally ✅

---

### ✅ Test 4: All Corners (4-Variable)
**Input**:
- Variables: 4
- Minterms: 0, 2, 8, 10
- Expected: B'D' (one group wrapping both ways)

**K-Map**:
```
      CD
      00 01 11 10
AB 00 [1][0][0][1]
   01 [0][0][0][0]
   11 [0][0][0][0]
   10 [1][0][0][1]
```

**Group**: All 4 corners → B'D' ✅

---

### ✅ Test 5: Checkerboard Pattern
**Input**:
- Variables: 4
- Minterms: 0, 2, 4, 6, 8, 10, 12, 14
- Expected: D' (all even numbers)

**K-Map**:
```
      CD
      00 01 11 10
AB 00 [1][0][0][1]
   01 [1][0][0][1]
   11 [1][0][0][1]
   10 [1][0][0][1]
```

**Group**: Two columns → D' ✅

---

### ✅ Test 6: Essential Prime Implicant
**Input**:
- Variables: 3  
- Minterms: 0, 1, 2, 5, 6, 7
- Expected: A + B'C'

**K-Map**:
```
    BC
    00 01 11 10
A 0 [1][1][0][1]
  1 [0][1][1][1]
```

**Groups**:
- Essential: (4,5,6,7) → A (covers 5,7 uniquely)
- Essential: (0,2) → B'C' (covers 0,2 uniquely)  
- Non-essential: (0,1) → A'B' (but not needed)

**Result**: F = A + B'C' ✅

---

## 🎯 How to Test

### In the Application:

1. **Select variables** (2, 3, or 4)
2. **Choose input method**:
   - Manual: Click cells
   - Minterms: Enter numbers
   - Expression: Type Boolean

3. **Verify results**:
   - Check group count
   - Verify term simplification
   - Compare with expected output
   - Check if all minterms covered

### Manual Verification:

```typescript
// Example: Test 2-variable
1. Set up K-map with minterms [0,1,3]
2. Expected groups:
   - Group 1: cells (0,0),(0,1) → term A'
   - Group 2: cells (0,1),(1,1) → term B
3. Expected result: A' + B
4. Verify in truth table:
   - Row 0 (A=0,B=0): 1 ✓ (from A')
   - Row 1 (A=0,B=1): 1 ✓ (from A' and B)
   - Row 2 (A=1,B=0): 0 ✓
   - Row 3 (A=1,B=1): 1 ✓ (from B)
```

---

## 🐛 Common Issues to Check

### ❌ Issue 1: Wrong Term Generated
**Symptom**: Term doesn't match expected
**Check**: 
- Gray code ordering correct?
- Binary conversion accurate?
- Bit position analysis correct?

### ❌ Issue 2: Missing Groups  
**Symptom**: Not all minterms covered
**Check**:
- Essential PI detection working?
- Greedy selection covering all?
- Edge cases handled?

### ❌ Issue 3: Redundant Groups
**Symptom**: More groups than necessary
**Check**:
- Prime implicant filtering working?
- Duplicate group detection working?
- Subset checking correct?

### ❌ Issue 4: Wraparound Not Working
**Symptom**: Corner/edge groups not forming
**Check**:
- Modulo arithmetic in place?
- All starting positions tried?
- Valid dimensions checked?

---

## ✅ Expected Behavior

### For Each Test:
1. ✅ All minterms are covered
2. ✅ Minimum number of groups
3. ✅ Largest possible groups used
4. ✅ Terms correctly simplified
5. ✅ Don't cares utilized when helpful
6. ✅ No redundant groups

### Output Format:
```
Groups: [
  {
    cells: [[0,1], [1,1]],
    term: "B",
    minterms: [1, 3],
    isPrimeImplicant: true,
    isEssential: true
  },
  ...
]

Expression: "A' + B"
```

---

## 📊 Benchmark Examples

### Simple Cases (Should be instant):
- 2 variables: < 10ms
- 3 variables: < 20ms  
- 4 variables: < 50ms

### Complex Cases:
- With many groups: < 100ms
- With don't cares: < 100ms
- Worst case (all 1s): < 50ms

---

## 🎓 Validation Strategy

1. **Unit Tests**: Test each component
   - Gray code generation
   - Position mapping
   - Term generation
   - Group formation

2. **Integration Tests**: Full scenarios
   - Each test case above
   - Random patterns
   - Edge cases

3. **Manual Verification**: Compare with:
   - Online K-map solvers
   - Textbook examples
   - Hand-calculated results

4. **Property Testing**: Verify:
   - All outputs are valid Boolean expressions
   - All minterms appear in truth table
   - Expressions are equivalent to original

---

**Test Status**: ✅ All major test cases defined!
**Next**: Run through each test and verify output!
