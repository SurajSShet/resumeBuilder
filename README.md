# Resume Builder 🎯

A modern, responsive web application for creating professional resumes. Built with pure HTML, CSS, and JavaScript - no frameworks required!

## Features ✨

- **Personal Information Section**: Add your name, title, contact details, and professional summary
- **Work Experience**: Dynamically add/remove multiple work experience entries
- **Education**: Add multiple education entries with degrees, institutions, and achievements
- **Skills**: List your technical and professional skills
- **Live Preview**: See your resume update in real-time as you type
- **Auto-Save**: Your data is automatically saved to browser storage
- **PDF Export**: Generate a PDF version of your resume using browser print functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations

## Getting Started 🚀

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation or build tools required!

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/SurajSShet/resumeBuilder.git
   cd resumeBuilder
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

   Or simply double-click the `index.html` file.

### Alternative: Using a Local Server

For the best experience, you can use a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Usage 📝

1. **Fill in Your Information**: Start by entering your personal details in the form on the left
2. **Add Work Experience**: Click "+ Add Experience" to add work history entries
3. **Add Education**: Click "+ Add Education" to add your educational background
4. **List Skills**: Enter your skills separated by commas
5. **Preview**: Watch your resume update in real-time on the right side
6. **Download**: Click "Download PDF" to save your resume as a PDF

### Tips:
- Your data is automatically saved in your browser's local storage
- Use the "Clear All" button to start fresh
- To get the best PDF output, use Chrome or Edge browser
- Fill in all required fields (marked with *) for a complete resume

## Project Structure 📁

```
resumeBuilder/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── app.js          # Application logic and interactivity
└── README.md       # This file
```

## Browser Compatibility 🌐

- ✅ Chrome/Edge (recommended for PDF export)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Features in Detail 🔍

### Auto-Save
Your resume data is automatically saved to browser's localStorage as you type. When you return to the page, your data will be restored.

### PDF Export
The "Download PDF" button uses your browser's print functionality to generate a clean, professional PDF. The print styles are optimized to:
- Hide the form and show only the resume preview
- Remove shadows and backgrounds for better printing
- Maintain proper formatting and spacing

### Responsive Design
The application adapts to different screen sizes:
- Desktop: Side-by-side form and preview
- Tablet: Side-by-side with adjusted spacing
- Mobile: Stacked layout for easy scrolling

## Customization 🎨

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Main theme color */
    --primary-dark: #1e40af;     /* Darker shade for hover */
    --secondary-color: #64748b;   /* Secondary buttons */
    /* ... more variables ... */
}
```

### Adding New Sections
To add new sections:
1. Add the form inputs in `index.html`
2. Add the preview elements in the preview section
3. Create update functions in `app.js`
4. Style the new elements in `styles.css`

## Security 🔒

- No data is sent to any server
- All data stays in your browser's local storage
- No tracking or analytics
- No external dependencies or CDNs

## Performance ⚡

- Lightweight: < 30KB total (uncompressed)
- No external dependencies
- Fast load times
- Smooth real-time updates

## Contributing 🤝

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Author ✍️

Created by Suraj S Shet

## Acknowledgments 🙏

- Inspired by modern resume builders
- Built with vanilla JavaScript for simplicity and performance
- Designed with accessibility and user experience in mind

## Support 💬

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy Resume Building! 🎉**
