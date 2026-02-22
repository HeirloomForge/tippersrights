# Tipper's Bill of Rights - Frontend UI/UX Architect Guide

## Role & Objective

Act as a world-class Frontend Engineer and UI/UX Visionary. The task is to design and generate the React/Vite code for "Tipper's Bill of Rights" (tippersbillofrights.com). The site operates functionally as a B2B certification directory but must masquerade as a viral, tongue-in-cheek consumer advocacy movement fighting "tipping fatigue."

## Tech Stack

- **Framework**: React built with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend Hooks**: Prepare mock states for Supabase (https://supabase.com) and Cloudflare Pages (https://cloudflare.com) integration

## Design Philosophy & Aesthetic

- **Tone**: Rebellious, bold, highly polished, and tongue-in-cheek. Think "modern tech startup meets historical revolutionary documents."
- **Typography**: High contrast. Use a brutalist, oversized sans-serif for massive impact headlines, paired with a highly legible, elegant serif for the actual "Bill of Rights" text to mimic legal authority.
- **Color Palette**: Deep, dark backgrounds (slate or charcoal) to make neon or stark white interactive elements pop. The "certified business" badge should feature a distinct, trustworthy color like vibrant emerald or electric blue.

## Core Animations & Interactions (Mandatory)

1. **Hero Section Interactive Element**: A 3D-styled, glowing point-of-sale iPad screen showing a "25% Tip" prompt that physically tilts or slides away when the user scrolls, revealing the main headline.
2. **Scroll-Linked Typography**: Use Framer Motion for scroll-linked typography. Headlines should assemble themselves from scattered letters as the user scrolls down the page.
3. **Button Micro-Interactions**: All buttons must exhibit a subtle magnetic pull and a glowing border transition on hover (e.g., "Join the Movement", "Find a Safe Business").
4. **"Tear-Away Receipt" Page Transition**: When moving between main pages, the screen should briefly mimic a physical receipt being ripped from a printer.

## Key Page Layouts

### 1. Landing Page
Optimize for viral sharing. Feature a stark, bold header, a live "Guilt-Free Transactions Saved" counter with a rolling number animation, and immediate calls-to-action for both consumers and businesses.

### 2. The Bill of Rights (`/billofrights`)
Design as a modern, dark-mode parchment. Text should fade in smoothly as if being written by a typewriter or quill. Include a sticky floating action button to "Print the Pocket Card."

### 3. The Safe Zone Directory
A map and search interface with a sleek, radar-sweep animation on load. Certified businesses should appear as glowing pins. Include sliding side-panels for business details rather than navigating away from the map.

### 4. The Arsenal (Merch/Printables Store)
A highly visual grid layout displaying the "Do Better" business cards and "Certified" window decals. Hovering over a window decal should trigger a reflection animation, making it look like real glass.

### 5. The Reality Check (Education Hub)
A masonry grid layout for articles on the socio-economic history of tipping and behavioral psychology. Use parallax scrolling for the featured images to create depth.

## Coding Constraints

- Write modular, reusable React components
- Ensure absolute mobile responsiveness — the viral nature means 80%+ of traffic will be on phones
- Avoid standard, uninspired bootstrap-style layouts
- Push the boundaries of Tailwind CSS with custom shadows, backdrop blurs, and irregular border radiuses
- File size target: 200-500 lines per module
