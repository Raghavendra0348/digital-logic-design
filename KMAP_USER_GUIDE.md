# 🎯 Enhanced Karnaugh Map Solver - User Guide

## 🚀 Overview

Your Karnaugh Map Solver now supports **5 different input methods** and provides comprehensive visualization of Boolean logic simplification with step-by-step solutions!

## ✨ Features

### 📥 Multiple Input Methods

#### 1. **K-Map (Manual Entry)** 
- Click cells directly in the K-map grid
- Cells cycle through: `0` → `1` → `X` (don't care) → `0`
- Best for: Visual learners, small problems

#### 2. **Truth Table**
- Input using the interactive truth table below the K-map
- Click on output values to toggle
- Best for: When you have a complete truth table

#### 3. **Boolean Expression** 
- Type expressions like: `A'B'C + AB'D'`
- Supports:
  - `'` for NOT (complement)
  - `+` for OR  
  - `*` for AND (optional, can be omitted)
  - Parentheses `()`
- Examples:
  - 2 variables: `A'B + AB'`
  - 3 variables: `A'B'C + ABC' + AB'C`
  - 4 variables: `A'B'C'D + A'B'CD' + AB'CD`
- Best for: When you have a boolean equation

#### 4. **Minterms**
- Enter comma-separated minterm numbers
- Example: `1, 2, 3, 7, 11, 15`
- Automatically generates Sum of Products (SOP) form
- Best for: Standard SOP notation from textbooks

#### 5. **Maxterms**
- Enter comma-separated maxterm numbers
- Example: `0, 4, 5, 6, 8, 12, 13, 14`
- Automatically generates Product of Sums (POS) form
- Best for: Standard POS notation from textbooks

### 🎨 Variable Options

- **2 Variables** (A, B): 2×2 K-map
- **3 Variables** (A, B, C): 2×4 K-map
- **4 Variables** (A, B, C, D): 4×4 K-map

### ⚡ Quick Actions

- **Clear All**: Reset all cells to 0
- **Fill All with 1**: Set all cells to 1
- **Reset**: Clear the entire map and start over

### 📊 Visualization Features

#### Simplified K-Map Result
- **Tabbed interface** for SOP and POS forms
- Large, prominent display of simplified expressions
- Automatic grouping with color-coded visualization

#### Original Groups
Each identified group shows:
- **Color indicator** matching the K-map visualization
- **Original expression** for the group
- **Minterms** covered by the group
- **Simplified term** (the Boolean expression)
- **Cell count** in the group

#### Logic Circuit
- Circuit description with gate requirements
- **Cost Analysis**:
  - Total gates needed
  - Literal count
  - Logic levels
  - Number of product terms
- Circuit notation guide

#### Truth Table
- Complete truth table with all input combinations
- **Color-coded rows**:
  - 🟢 Green: Minterms (output = 1)
  - 🟡 Yellow: Don't cares (output = X)
  - Gray: Maxterms (output = 0)
- **Summary statistics**:
  - Total rows
  - Minterm count
  - Maxterm count
  - Don't care count

## 📝 How to Use

### Example 1: Using Boolean Expression

1. Select **4 Variables**
2. Choose **Boolean Expression** input method
3. Enter: `A'B'C'D + A'B'CD' + A'B'CD`
4. Click **Parse Expression**
5. View the simplified result: `A'B'C`

### Example 2: Using Minterms

1. Select **4 Variables**
2. Choose **Minterms** input method
3. Enter: `1, 2, 3`
4. Optionally enter don't cares: `10, 11`
5. Click **Apply Minterms**
6. View SOP and POS forms in tabs

### Example 3: Manual Entry

1. Select **3 Variables**
2. Choose **K-Map (Manual Entry)**
3. Click cells to set values (0, 1, or X)
4. Groups are automatically identified
5. View simplified expression immediately

### Example 4: Using Maxterms

1. Select **3 Variables**
2. Choose **Maxterms** input method
3. Enter: `0, 4, 5, 6, 7`
4. Click **Apply Maxterms**
5. View POS form in the results

## 🎓 Don't Care Conditions (X)

Don't care conditions are inputs that:
- Never occur in your system
- Don't matter for the application
- Can be treated as either 0 or 1 for optimization

**How to use:**
- Manual entry: Click cells three times (0 → 1 → X)
- With minterms/maxterms: Enter don't care positions separately
- With expression: Use the don't cares input field

**Benefits:**
- Create larger groups
- Simpler expressions
- Fewer gates needed

## 🔍 Understanding the Results

### SOP (Sum of Products)
- OR of AND terms
- Each group = one AND term
- Example: `A'B'C + A'BD`
- Use when: More 0s than 1s in truth table

### POS (Product of Sums)
- AND of OR terms  
- Each group = one OR term (from 0s)
- Example: `(A+B'+C)(A'+B+C')`
- Use when: More 1s than 0s in truth table

### Solution Steps
Click **Show Steps** to see:
1. Number of variables
2. Identified minterms/maxterms
3. Don't care terms (if any)
4. Number of groups found
5. Each group's term and size

## 💾 Export Options

### Download PDF
- Click **Download PDF** to save your solution
- Uses browser print functionality
- Includes:
  - K-map visualization
  - Simplified expressions
  - Truth table
  - Circuit analysis

## 🎯 Tips for Best Results

1. **Choose the right input method**:
   - Have an equation? Use Boolean Expression
   - Have minterm numbers? Use Minterms
   - Want to explore? Use Manual Entry

2. **Use don't cares strategically**:
   - They help create larger, simpler groups
   - More don't cares = simpler expressions

3. **Compare SOP vs POS**:
   - Check both tabs
   - Choose the simpler form
   - Look at gate count in circuit analysis

4. **Verify with truth table**:
   - Check that minterms match your requirements
   - Ensure don't cares are correctly placed

## 🐛 Troubleshooting

### "Invalid expression" error
- Check variable names match your selection (A, B, C, D)
- Use `'` for NOT, not `~` or `!`
- Use `+` for OR, not `|`
- Make sure all terms are valid

### Groups not forming correctly
- Ensure Gray code ordering (built-in)
- Groups must be rectangular and power-of-2 sizes
- Check for wraparound groups (edges are adjacent)

### Wrong simplified expression
- Verify input method matches your data
- Check that variables count is correct
- Ensure don't cares are properly entered

## 📚 Additional Resources

### Gray Code Ordering
K-maps use Gray code where only one bit changes between adjacent cells:
- 2-bit: `00, 01, 11, 10`
- 3-bit: `000, 001, 011, 010, 110, 111, 101, 100`

### Grouping Rules
1. Groups must contain 2ⁿ cells (1, 2, 4, 8, 16)
2. Groups must be rectangular or square
3. Make groups as large as possible
4. Groups can wrap around edges
5. Minimize the number of groups

## 🎉 Examples to Try

### Example 1: Simple 2-variable
- Variables: 2
- Minterms: 0, 1, 3
- Result: Should get `B + A'`

### Example 2: 3-variable with don't cares
- Variables: 3
- Expression: `A'B'C + ABC'`
- Don't cares: 1, 7
- Result: Simpler than without don't cares

### Example 3: 4-variable complex
- Variables: 4
- Minterms: 0, 1, 2, 8, 9, 12
- Don't cares: 10, 11, 14, 15
- Result: Demonstrates power of don't cares

---

**Enjoy simplifying Boolean logic! 🎓⚡**
