# Ziyi Zhu Creative Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a minimalistic design inspired by Teenage Engineering with bold typography, smooth animations, and a custom cursor experience.

## Features

- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Smooth Animations**: GSAP-powered animations with intersection observers
- **Responsive Design**: Mobile-first approach with custom cursor
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Image Gallery**: Scroll and grid view modes with fullscreen preview
- **Performance Optimized**: Next.js Image optimization and lazy loading
- **Bold Typography**: Space Grotesk font with large, impactful text
- **Clean Aesthetics**: Minimalistic design with clean code structure

## Development Setup

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Pre-commit Hooks & Code Quality

This project uses comprehensive pre-commit hooks to ensure code quality:

### What Runs on Commit

1. **Linting**: ESLint with TypeScript rules
2. **Formatting**: Prettier for consistent code style
3. **Type Checking**: TypeScript compilation check
4. **Commit Message Validation**: Conventional commit format

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run type-check   # Run TypeScript type checking
npm run format       # Format all files with Prettier
npm run format:check # Check if files are formatted
```

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

Examples:
feat: add new animation component
fix(header): resolve navigation link issue
docs: update README with new features
style: format code with prettier
refactor(works): improve gallery performance
```

### Supported Commit Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Reverting previous commits

### Configuration Files

- `.prettierrc`: Prettier formatting rules
- `.prettierignore`: Files to exclude from formatting
- `eslint.config.mjs`: ESLint rules with TypeScript support
- `commitlint.config.js`: Commit message validation rules
- `.husky/`: Git hooks configuration

### Bypassing Hooks (Emergency Only)

If you need to bypass the pre-commit hooks in an emergency:

```bash
git commit --no-verify -m "emergency: bypass hooks"
```

⚠️ **Warning**: Only use this for true emergencies. Regular development should always use the hooks.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── About.tsx       # About section
│   ├── Contact.tsx     # Contact section
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   └── Works.tsx       # Portfolio gallery
├── data/              # Static data
│   └── artworks.ts    # Portfolio items
├── hooks/             # Custom React hooks
│   └── useAnimations.ts # Animation utilities
└── lib/               # Utility libraries
    ├── animations.ts  # GSAP animation utilities
    └── theme.ts       # Theme management
```

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP with ScrollTrigger and SplitText
- **Icons**: Custom SVG icons
- **Font**: Space Grotesk (Google Fonts)

## Customization

### Changing Content

- Edit component files in `src/components/` to update text content
- Replace images in the `public/images/` folder with your own artwork
- Update artwork data in `src/data/artworks.ts`
- Modify contact links in `src/components/Contact.tsx`

### Styling

- Modify colors in `src/app/globals.css` CSS variables
- Adjust Tailwind classes in component files
- Update animation settings in `src/lib/animations.ts`

### Adding New Projects

To add a new project to the gallery, edit `src/data/artworks.ts`:

```typescript
{
  id: 'unique-id',
  title: 'PROJECT TITLE',
  description: 'Project Type, Year',
  category: 'generative' | 'photography' | 'painting',
  imagePath: '/images/your-image.jpg'
}
```

## Deployment

The project is optimized for deployment on Vercel:

```bash
npm run build
```

## Contributing

1. Follow the commit message conventions
2. Ensure all pre-commit hooks pass
3. Test your changes thoroughly
4. Update documentation as needed

## Credits

- **Font**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) from Google Fonts
- **Design inspiration**: Teenage Engineering
- **Animation library**: GSAP

## License

This project is private and proprietary.

---

Created by Ziyi Zhu
