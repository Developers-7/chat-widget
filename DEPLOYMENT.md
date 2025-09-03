# Chat Widget Deployment Guide

## 🎯 Overview
Your React chat widget has been successfully converted into an embeddable script that can be integrated into any website without affecting the host page's styling or functionality.

## 📁 Generated Files
- `dist/chat-widget.iife.js` (1.5MB) - The main widget script
- `dist/chat-widget.css` (33KB) - Widget styles (embedded in JS)
- `example.html` - Integration example

## 🚀 Deployment Steps

### 1. Upload Widget Files
Upload the `chat-widget.iife.js` file to your web server or CDN:
```bash
# Example upload locations
https://your-domain.com/widgets/chat-widget.iife.js
https://cdn.your-domain.com/chat-widget.iife.js
```

### 2. Integration Methods

#### Method 1: Auto-initialization (Recommended)
```html
<script src="https://your-domain.com/chat-widget.iife.js" data-chat-widget></script>
```

#### Method 2: Manual initialization with configuration
```html
<script src="https://your-domain.com/chat-widget.iife.js"></script>
<script>
  ChatWidget.init({
    apiEndpoint: 'https://your-api.com/chat'
  });
</script>
```

#### Method 3: Configuration via data attributes
```html
<script 
  src="https://your-domain.com/chat-widget.iife.js" 
  data-chat-widget 
  data-api-endpoint="https://your-api.com/chat"
></script>
```

### 3. API Configuration

#### Option A: Global Configuration
```javascript
// Set before loading the widget
window.CHAT_WIDGET_API_ENDPOINT = 'https://your-api.com/chat';
```

#### Option B: Initialization Configuration
```javascript
ChatWidget.init({
  apiEndpoint: 'https://your-api.com/chat'
});
```

## 🔧 API Requirements
Your backend should accept POST requests with this format:
```json
{
  "model": "gemini-2.5-flash",
  "contents": [
    {
      "parts": [
        {
          "text": "User's message here"
        }
      ]
    }
  ]
}
```

Expected response format:
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "AI response here"
          }
        ]
      }
    }
  ]
}
```

## ✨ Features
- **Style Isolation**: Uses Shadow DOM to prevent CSS conflicts
- **Responsive Design**: Works on all screen sizes
- **Markdown Support**: Renders formatted text and code blocks
- **Syntax Highlighting**: Beautiful code display with Prism.js
- **No Dependencies**: Self-contained script
- **Easy Integration**: Single script tag
- **Demo Mode**: Works out of the box for testing

## 🌐 Browser Support
- Chrome/Edge 63+
- Firefox 63+
- Safari 10.1+
- All modern mobile browsers

## 📱 Mobile Responsive
The widget automatically adapts to mobile devices:
- Responsive dialog sizing
- Touch-friendly interface
- Optimized for small screens

## 🔒 Security
- No external dependencies
- Shadow DOM isolation
- CORS-compliant API calls
- Input sanitization for markdown

## 📈 Production Considerations
1. **CDN**: Use a CDN for faster loading
2. **Caching**: Set appropriate cache headers
3. **Compression**: Enable gzip compression
4. **Monitoring**: Monitor API calls and errors
5. **Rate Limiting**: Implement rate limiting on your API

## 🐛 Troubleshooting
- Check browser console for errors
- Verify API endpoint is accessible
- Ensure CORS is configured correctly
- Test with demo mode first

## 📋 Testing Checklist
- [ ] Widget appears in bottom-right corner
- [ ] Chat dialog opens when clicked
- [ ] Messages send and receive responses
- [ ] Markdown and code highlighting work
- [ ] Mobile responsive design
- [ ] No console errors
- [ ] API integration working
