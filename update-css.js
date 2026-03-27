const fs = require('fs');
let css = fs.readFileSync('c:/Users/arman/Game-Store-System/src/index.css', 'utf8');

// Colors
css = css.replace(/--orange-light/g, '--accent');
css = css.replace(/#e35e26/ig, '#c084fc');
css = css.replace(/#ff6b2b/ig, '#00f0ff'); // Hover state
css = css.replace(/rgba\(227,\s*94,\s*38/ig, 'rgba(192, 132, 252'); // rgba(227, 94, 38) -> rgba(192, 132, 252)
css = css.replace(/--black:\s*#161618;/ig, '--black: #060010;');
css = css.replace(/--gray-800:\s*#454549;/ig, '--gray-800: rgba(255, 255, 255, 0.04);');

// Text contrast on buttons
css = css.replace(/\.show-all-button {([\s\S]*?)color: var\(--black\);/g, '.show-all-button {$1color: #fff;');

// Glassmorphism
css = css.replace(/\.main-header\s*{[^}]*?background-color:\s*var\(--black\);[^}]*?}/, (match) => {
    return match.replace('background-color: var(--black);', 'background-color: rgba(6, 0, 16, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.05);');
});

css = css.replace(/\.platform-bar\s*{[^}]*?background-color:\s*var\(--gray-800\);[^}]*?}/, (match) => {
    return match.replace('background-color: var(--gray-800);', 'background-color: var(--gray-800); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.05);');
});

css = css.replace(/\.category-card\s*{[^}]*?background-color:\s*var\(--gray-800\);[^}]*?}/g, (match) => {
    return match.replace('background-color: var(--gray-800);', 'background-color: var(--gray-800); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s ease, border-color 0.3s ease;');
});
if(!css.includes('.category-card:hover')) {
    css += `\n.category-card:hover { transform: translateY(-5px); border-color: var(--accent); }\n`;
}

css = css.replace(/\.product-card\s*{[^}]*?background-color:\s*var\(--gray-800\);[^}]*?}/, (match) => {
    return match.replace('background-color: var(--gray-800);', 'background-color: var(--gray-800); backdrop-filter: blur(10px);');
});

css = css.replace(/\.product-actions\s*{[^}]*?background-color:\s*var\(--gray-800\);[^}]*?}/, (match) => {
    return match.replace('background-color: var(--gray-800);', 'background: transparent; border-top: 1px solid rgba(255,255,255,0.05);');
});

fs.writeFileSync('c:/Users/arman/Game-Store-System/src/index.css', css);
