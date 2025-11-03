# Digital Logic & Design - Interactive Digital Electronics Learning Platform

## 🎓 Project Description

**Digital Logic & Design** is a comprehensive educational platform designed to help students and engineers master digital logic design through interactive simulations and real-time visualizations. The platform offers hands-on learning experiences with Boolean algebra, Karnaugh maps, Hamming codes, number systems, arithmetic circuits, counters, and complete digital projects.

## ✨ Features

### Core Learning Modules
- **Number Systems** - Binary, Decimal, Octal, and Hexadecimal conversions
- **Arithmetic Circuits** - Half Adder, Full Adder, 4-bit Adder, Subtractor, and 4×4 Multiplier
- **Boolean Algebra** - Truth tables, logic gates, and simplification
- **K-Map Solver** - Karnaugh Map simplification with visual grouping
- **Combinational Circuits** - Encoders, decoders, and multiplexers
- **Sequential Circuits** - Flip-flops, latches, and timing diagrams
- **Counter Design** - Synchronous, asynchronous, up/down, and modulo-N counters
- **Digital Clock Project** - Complete BCD counter-based digital clock
- **Hamming Code** - Error detection and correction encoder/decoder

### Key Features
- 🎯 Interactive real-time simulations
- 📊 Visual circuit diagrams and state transitions
- 📚 Comprehensive theory and step-by-step guides
- 📱 Fully responsive mobile-friendly design
- 🎨 Modern dark theme with glowing accents
- ⚡ Fast and optimized performance
- 🆓 100% free educational resource

## 🚀 Syllabus Coverage

### Complete Coverage (100%)
- ✅ Unit I: Digital Logic Fundamentals
- ✅ Unit II: Combinational Circuits & Arithmetic (NEW)
- ✅ Unit III: Sequential Circuits
- ✅ Unit VII: Error Detection & Correction

### High Coverage (80%+)
- ✅ Unit V: Counters & Registers (NEW)
- ✅ Unit VI: Digital Projects (NEW - Digital Clock)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Routing**: React Router v6

## 📦 Installation & Development

### Prerequisites
- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Development

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd digital-logic-and-design

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build for Production

```sh
# Build the production-ready app
npm run build

# Preview the production build
npm run preview
```

### Linting

```sh
# Run ESLint to check code quality
npm run lint
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and configure the build settings
4. Deploy with one click!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to [Netlify](https://netlify.com)
3. Or use Netlify CLI:
```sh
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Update `vite.config.ts` with your repo name as base:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```
2. Build: `npm run build`
3. Deploy the `dist` folder to `gh-pages` branch

## 📁 Project Structure

```
digital-logic-and-design/
├── public/               # Static assets
├── src/
│   ├── assets/          # Images and media
│   ├── components/      # Reusable React components
│   │   ├── ui/         # Shadcn UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── CounterDesign.tsx       (NEW)
│   │   ├── DigitalClock.tsx        (NEW)
│   │   ├── ArithmeticCircuits.tsx  (NEW)
│   │   ├── NumberSystems.tsx
│   │   ├── BooleanAlgebra.tsx
│   │   ├── Combinational.tsx
│   │   ├── Sequential.tsx
│   │   ├── KarnaughMaps.tsx
│   │   ├── HammingCode.tsx
│   │   ├── Learn.tsx
│   │   └── ...
│   ├── App.tsx         # Main app component with routing
│   ├── main.tsx        # App entry point
│   └── index.css       # Global styles
├── INTEGRATION_COMPLETE.md   # Implementation summary
├── QUICK_REFERENCE.md        # Quick reference guide
├── SYLLABUS_GAP_ANALYSIS.md  # Detailed syllabus coverage
└── package.json        # Dependencies and scripts
```

## 🎯 New Features (v2.0.0)

### Recently Added
1. **Arithmetic Circuits Lab** - Complete adder/subtractor/multiplier suite
2. **Counter Design Lab** - Comprehensive counter design and simulation
3. **Digital Clock Project** - Full BCD-based digital clock implementation
4. **Enhanced Navigation** - 11 interactive lab cards with improved UX
5. **Updated Branding** - Rebranded to "Digital Logic & Design"

## 📚 Learning Resources

The platform includes:
- Interactive simulations for hands-on learning
- Step-by-step theory explanations
- Truth tables and Boolean expressions
- Circuit diagrams and visualizations
- Real-world applications and examples
- Practice exercises and examples

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is available for educational purposes.

## 📧 Contact

For questions or feedback, visit the Contact page on the website.

---

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project using various platforms:
- **Vercel**: Push to GitHub and connect your repository
- **Netlify**: Drag and drop the build folder or connect via Git
- **GitHub Pages**: Configure GitHub Actions for automatic deployment

## Custom Domain Setup

To connect a custom domain:
1. Configure DNS settings to point to your hosting platform
2. Set up SSL certificates for HTTPS
3. Update the canonical URLs in the code to match your domain
