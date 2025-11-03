# K-Map Grouping Visualization Examples

## Example 1: Simple 3-Variable K-Map with 2 Groups

### Input
- Variables: A, B, C (3 variables)
- Minterms: 0, 1, 2, 3, 6, 7
- Don't Cares: none

### Visual Representation

```
K-Map Grid (BC on columns, A on rows):
     BC
     00  01  11  10
A  ┌─────────────────┐
0  │ ①1  ①1  ─0  ②1 │  ← Group 1 (red): A'B'C' + A'B'C
1  │ ─0  ─0  ②1  ②1 │  ← Group 2 (blue): ABC + ABC'
   └─────────────────┘

Legend:
┌──────────────────────────────────┐
│ ① Red    │ A'B' (4 cells)       │  ← Group 1: covers row 0, cols 00-01
│ ② Blue   │ AC   (2 cells)       │  ← Group 2: covers row 1, cols 11-10
└──────────────────────────────────┘
```

### Actual Visual Features:
- **Group 1 (Red)**: Cells (0,0), (0,1) have thick red dashed border, red tinted background, badge "①" on first cell
- **Group 2 (Blue)**: Cells (1,2), (1,3) have thick blue dashed border, blue tinted background, badge "②" on first cell

---

## Example 2: 4-Variable K-Map with Wraparound Group

### Input
- Variables: A, B, C, D (4 variables)
- Minterms: 0, 2, 8, 10
- Don't Cares: none

### Visual Representation

```
K-Map Grid (CD on columns, AB on rows):
     CD
     00  01  11  10
AB ┌─────────────────┐
00 │ ①1  ─0  ─0  ①1 │  ← Group wraps around left-right edges
01 │ ─0  ─0  ─0  ─0 │
11 │ ─0  ─0  ─0  ─0 │
10 │ ①1  ─0  ─0  ①1 │  ← Group wraps around top-bottom edges
   └─────────────────┘

Legend:
┌──────────────────────────────────┐
│ ① Red    │ B'D' (4 cells)       │  ← Wraparound group at corners
└──────────────────────────────────┘
```

### Visual Features:
- **Group 1 (Red)**: All four corner cells share same red dashed border
- **Wraparound Indication**: Border pattern helps visualize the wraparound
- **Single Badge**: Badge "①" appears only on first cell (0,0)

---

## Example 3: Complex 4-Variable with Overlapping Groups

### Input
- Variables: A, B, C, D
- Minterms: 0, 1, 2, 3, 8, 9, 10, 11, 12, 13, 14, 15
- Don't Cares: none

### Visual Representation

```
K-Map Grid:
     CD
     00  01  11  10
AB ┌─────────────────┐
00 │ ①1  ①1  ①1  ①1 │  ← Group 1: A'B' (4 cells, red)
01 │ ─0  ─0  ─0  ─0 │
11 │ ─0  ─0  ─0  ─0 │
10 │ ②1  ②1  ②1  ②1 │  ← Group 2: AB' (4 cells, blue)
   └─────────────────┘

Additional Groups for middle rows...

Legend:
┌──────────────────────────────────┐
│ ① Red    │ A'B' (4 cells)       │
│ ② Blue   │ AB'  (4 cells)       │
│ ③ Green  │ AB   (4 cells)       │
└──────────────────────────────────┘
```

---

## Example 4: Don't Care Optimization

### Input
- Variables: A, B, C
- Minterms: 0, 2, 5, 6, 7
- Don't Cares: 1, 3

### Visual Representation

```
K-Map Grid:
     BC
     00  01  11  10
A  ┌─────────────────┐
0  │ ①1  ①X  ①X  ①1 │  ← Group 1 uses don't cares to form larger group
1  │ ─0  ②1  ②1  ②1 │  ← Group 2
   └─────────────────┘

Legend:
┌──────────────────────────────────┐
│ ① Red    │ A'   (4 cells)       │  ← Don't cares 1,3 included
│ ② Green  │ AC   (3 cells)       │
└──────────────────────────────────┘
```

### Visual Features:
- **Cells with X**: Show accent color (yellow/amber) with "X" label
- **Group Including X**: Red border encompasses both 1s and Xs
- **Optimized Coverage**: Larger group created by strategically using don't cares

---

## Visual Enhancement Details

### On the K-Map Grid:

1. **Regular Cell (0)**
   - Light gray background
   - Thin border
   - Gray "0" text

2. **Minterm Cell (1)**
   - Gradient blue background (primary color)
   - Primary color border
   - White "1" text
   - **+ Group overlays** (colored dashed borders)
   - **+ Group badge** (numbered circle on first cell)

3. **Don't Care Cell (X)**
   - Gradient amber background (accent color)
   - Accent color border
   - Contrasting "X" text
   - **+ Can have group overlays**

### In the Group Legend:

Each group item shows:
```
┌─────────────────────────────────────┐
│  ①  │ A'B'C + A'BC    │ 4 cells    │
│ red │ (Boolean term)  │ (count)    │
└─────────────────────────────────────┘
```

### In the Groups Information Panel:

```
┌─────────────────────────────────────────┐
│ ① Group 1 • 4 cells                     │
│                                          │
│ Term:      A'B'                          │
│ Minterms:  (0, 1, 2, 3)                 │
└─────────────────────────────────────────┘
```

---

## Color Accessibility

The visualization is designed to be accessible:

- **Not Color-Blind Only**: Group numbers (①②③) provide identification
- **High Contrast**: Borders are thick (5px) and clearly visible
- **Text Labels**: All groups labeled in legend and info panel
- **Consistent Pattern**: Dashed borders distinguish groups from cell borders

---

## Animation Sequence

When groups are identified:

1. **0ms**: K-map updates with new values
2. **50ms**: First group overlay fades in
3. **100ms**: Second group overlay fades in
4. **150ms**: Third group overlay fades in
5. **200ms**: First group badge scales in
6. **250ms**: Second group badge scales in
7. **400ms**: Legend section slides in
8. **450ms**: First legend item appears
9. **500ms**: Second legend item appears

Total animation: ~500ms for smooth, professional appearance
