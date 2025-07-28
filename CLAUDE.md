# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Base Converter is a Progressive Web App (PWA) for converting numbers between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) number systems. The app is designed for educational purposes and provides an interactive interface for learning number system conversions.

## Key Features

- **Live Conversion**: Automatic conversion between number systems as user types
- **Visual Digit Display**: Each digit shown in individual boxes for clear visualization
- **System Toggle**: Checkboxes to show/hide specific number systems
- **Increment/Decrement**: +1/-1 buttons for step-by-step learning
- **PWA Support**: Installable app with offline functionality
- **Responsive Design**: Works on desktop and mobile devices

## Architecture

### Core Components

- **BaseConverter Class** (`app.js`): Main application logic handling conversions, validation, and UI updates
- **HTML Structure** (`index.html`): Bootstrap-based responsive layout with system rows
- **PWA Configuration** (`manifest.json`, `service-worker.js`): Progressive Web App setup for offline use

### Layout Structure

The app uses a horizontal layout per number system:
```
[Base Indicator] [Input Field] [Digit Display Boxes]
     ₂              1111         [1][1][1][1]
```

Each system row contains:
- Large base indicator (₂, ₈, ₁₀, ₁₆) on the left
- Compact input field for manual entry
- Digit display area with individual boxes, right-aligned

### Key Architecture Patterns

1. **Event-Driven Updates**: Input changes trigger automatic recalculation across all systems
2. **State Management**: Single `currentValue` drives all display updates
3. **Validation**: Real-time input validation per number system base
4. **Responsive Flexbox**: Layout adapts from horizontal to vertical on mobile

## Development Commands

### Local Development
```bash
# Start local server for testing PWA features
python3 -m http.server 8000
```

### PWA Testing
- Test offline functionality by stopping server after initial load
- Use browser dev tools > Application > Service Workers to verify registration
- Test installation prompt on mobile devices

### Icon Generation
Open `create-icons.html` in browser to generate required PWA icons in various sizes.

## Code Organization

### CSS Structure
- **CSS Variables**: Centralized color scheme in `:root`
- **Component-Based**: Separate styles for digit boxes, system rows, buttons
- **Responsive Breakpoints**: Mobile-first approach with `@media` queries

### JavaScript Structure
- **Class-Based**: Single `BaseConverter` class encapsulates all functionality
- **Method Organization**: Clear separation between input handling, validation, display updates
- **Base Configuration**: Centralized number system definitions in `this.bases`

## Styling Guidelines

- **Digit Boxes**: 60x60px on desktop, 45x45px on mobile, with hover animations
- **Base Indicators**: 2rem font size, primary color, positioned at start of each row
- **Button Design**: Flat design without gradients, equal width distribution
- **Cards**: Rounded corners with subtle shadows for depth

## Important Implementation Notes

- Input validation prevents invalid characters per number system
- Empty inputs default to value 0
- Maximum value constraints defined per base (32 bits for binary, etc.)
- Service worker caches all assets for offline functionality
- Bootstrap 5.3.0 used for responsive grid and components