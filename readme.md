# 📱 Mobile Speed Meter

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-brightgreen.svg)]()
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue.svg)]()
[![GPS Enabled](https://img.shields.io/badge/GPS-Enabled-orange.svg)]()

A real-time GPS-based speed measurement application optimized for mobile devices. Track your speed with high accuracy using your device's GPS capabilities.

## ✨ Features

### 🚀 Core Functionality
- **Real-time Speed Tracking**: Live GPS-based speed calculation with high accuracy
- **Dual Units**: Toggle between km/h and mph with instant conversion
- **Comprehensive Statistics**: Track maximum speed, average speed, total distance, and trip duration
- **High-Speed Alerts**: Visual warnings when exceeding speed thresholds

### 📱 Mobile Optimized
- **Touch-Friendly Interface**: Large buttons and readable text designed for mobile use
- **Progressive Web App (PWA)**: Install on your device like a native app
- **Offline Capability**: Core functionality works without internet connection
- **Responsive Design**: Adapts perfectly to all screen sizes

### 🎨 User Experience  
- **Modern Glass-Morphism UI**: Beautiful gradient background with frosted glass effects
- **Smooth Animations**: Fluid transitions and visual feedback
- **Accessibility Support**: ARIA labels and keyboard navigation
- **Location Information**: Display current coordinates and accuracy

### 🔧 Technical Features
- **Haversine Formula**: Precise distance and speed calculations
- **GPS Accuracy Monitoring**: Real-time accuracy indicators
- **Error Handling**: Comprehensive error management for GPS issues
- **Performance Optimized**: Efficient battery usage and smooth operation

## 🚀 Quick Start

### Option 1: Direct Usage
1. Visit the live demo: [Mobile Speed Meter](https://fzvincent.github.io/speed-meter/)
2. Allow location access when prompted
3. Start tracking your speed!

### Option 2: Local Installation
```bash
# Clone the repository
git clone https://github.com/fzvincent/speed-meter.git

# Navigate to project directory
cd speed-meter

# Serve locally (choose one method)
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your mobile browser.

### Option 3: PWA Installation
1. Open the app in your mobile browser
2. Tap "Add to Home Screen" when prompted
3. Use like a native app!

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **APIs**: Geolocation API, Service Worker API
- **Features**: PWA, Offline Support, GPS Tracking
- **Design**: CSS Grid, Flexbox, Glass-morphism
- **Performance**: Optimized for mobile devices

## 📱 Use Cases

### 🚗 **Automotive**
- Monitor driving speed in real-time
- Track trip statistics for fuel efficiency
- Speed limit compliance checking

### 🚴 **Sports & Fitness**
- Cycling speed and distance tracking
- Running pace monitoring
- Outdoor activity logging

### 🚢 **Marine & Aviation**
- Boat speed measurement
- Aircraft ground speed tracking
- Maritime navigation assistance

### 🔬 **Testing & Research**
- GPS accuracy testing
- Speed measurement validation
- Mobile device performance testing

## 🌐 Browser Support

| Browser | Mobile | Desktop | PWA Support |
|---------|--------|---------|-------------|
| Chrome  | ✅     | ✅      | ✅          |
| Safari  | ✅     | ✅      | ✅          |
| Firefox | ✅     | ✅      | ✅          |
| Edge    | ✅     | ✅      | ✅          |

**Requirements**: HTTPS connection and location permission

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.

**✅ You can:**
- Share and redistribute the material
- Adapt, remix, and build upon the material
- Use for personal, educational, or research purposes

**❌ You cannot:**
- Use for commercial purposes
- Sell or monetize the application
- Use in commercial products or services

For commercial licensing inquiries, please contact the project maintainer.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:
- 🐛 Bug reports
- ✨ Feature requests  
- 🔧 Development setup
- 📝 Code standards
- 🧪 Testing guidelines

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/fzvincent/speed-meter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/fzvincent/speed-meter/discussions)
- **Documentation**: Check the [wiki](https://github.com/fzvincent/speed-meter/wiki) for detailed guides

## 🙏 Acknowledgments

- GPS calculation algorithms inspired by aviation and maritime navigation
- UI design influenced by modern mobile app design principles
- Community feedback from mobile web developers

---

<div align="center">

**[⭐ Star this repo](https://github.com/fzvincent/speed-meter) if you find it useful!**

Made with ❤️ for the mobile web community

</div>
