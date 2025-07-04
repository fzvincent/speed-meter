class SpeedMeter {
    constructor() {
        this.isTracking = false;
        this.watchId = null;
        this.lastPosition = null;
        this.lastTime = null;
        this.speeds = [];
        this.totalDistance = 0;
        this.startTime = null;
        this.isMetric = true; // true for km/h, false for mph
        
        this.initializeElements();
        this.attachEventListeners();
        this.checkGeolocationSupport();
    }

    initializeElements() {
        this.elements = {
            currentSpeed: document.getElementById('currentSpeed'),
            speedUnit: document.getElementById('speedUnit'),
            maxSpeed: document.getElementById('maxSpeed'),
            avgSpeed: document.getElementById('avgSpeed'),
            distance: document.getElementById('distance'),
            duration: document.getElementById('duration'),
            accuracy: document.getElementById('accuracy'),
            altitude: document.getElementById('altitude'),
            coordinates: document.getElementById('coordinates'),
            status: document.getElementById('status'),
            startBtn: document.getElementById('startBtn'),
            stopBtn: document.getElementById('stopBtn'),
            resetBtn: document.getElementById('resetBtn'),
            unitToggle: document.getElementById('unitToggle')
        };
    }

    attachEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startTracking());
        this.elements.stopBtn.addEventListener('click', () => this.stopTracking());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        this.elements.unitToggle.addEventListener('click', () => this.toggleUnits());
    }

    checkGeolocationSupport() {
        if (!navigator.geolocation) {
            this.updateStatus('❌', 'Geolocation not supported', 'error');
            this.elements.startBtn.disabled = true;
        } else {
            this.updateStatus('✅', 'Ready to start tracking', 'ready');
        }
    }

    startTracking() {
        if (this.isTracking) return;

        this.updateStatus('🔍', 'Getting location...', 'searching');
        
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handlePositionUpdate(position),
            (error) => this.handleError(error),
            options
        );

        this.isTracking = true;
        this.startTime = Date.now();
        this.elements.startBtn.disabled = true;
        this.elements.stopBtn.disabled = false;
        document.body.classList.add('tracking');
    }

    stopTracking() {
        if (!this.isTracking) return;

        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }

        this.isTracking = false;
        this.elements.startBtn.disabled = false;
        this.elements.stopBtn.disabled = true;
        document.body.classList.remove('tracking');
        this.updateStatus('⏹️', 'Tracking stopped', 'stopped');
    }

    reset() {
        this.stopTracking();
        
        this.lastPosition = null;
        this.lastTime = null;
        this.speeds = [];
        this.totalDistance = 0;
        this.startTime = null;

        this.elements.currentSpeed.textContent = '0';
        this.elements.maxSpeed.textContent = '0';
        this.elements.avgSpeed.textContent = '0';
        this.elements.distance.textContent = '0.00';
        this.elements.duration.textContent = '00:00';
        this.elements.accuracy.textContent = '-';
        this.elements.altitude.textContent = '-';
        this.elements.coordinates.textContent = '-';

        this.updateStatus('✅', 'Ready to start tracking', 'ready');
    }

    toggleUnits() {
        this.isMetric = !this.isMetric;
        const unit = this.isMetric ? 'km/h' : 'mph';
        const toggleText = this.isMetric ? 'Switch to mph' : 'Switch to km/h';
        
        this.elements.speedUnit.textContent = unit;
        this.elements.unitToggle.textContent = toggleText;
        
        // Update all displayed speeds
        this.updateSpeedDisplays();
    }

    handlePositionUpdate(position) {
        const { latitude, longitude, accuracy, altitude } = position.coords;
        const timestamp = position.timestamp;

        this.updateLocationInfo(position);

        if (this.lastPosition && this.lastTime) {
            const speed = this.calculateSpeed(
                this.lastPosition.latitude,
                this.lastPosition.longitude,
                latitude,
                longitude,
                timestamp - this.lastTime
            );

            this.speeds.push(speed);
            this.updateSpeedDisplays(speed);
            this.updateDistance(this.lastPosition, { latitude, longitude });
        }

        this.lastPosition = { latitude, longitude };
        this.lastTime = timestamp;

        this.updateStatus('🎯', 'Tracking active', 'tracking');
        this.updateDuration();
    }

    calculateSpeed(lat1, lon1, lat2, lon2, timeDiff) {
        // Calculate distance using Haversine formula
        const R = 6371000; // Earth's radius in meters
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distance in meters
        
        // Calculate speed in m/s, then convert to km/h
        const timeInSeconds = timeDiff / 1000;
        const speedMS = distance / timeInSeconds;
        const speedKMH = speedMS * 3.6;
        
        return Math.max(0, speedKMH); // Ensure non-negative speed
    }

    updateSpeedDisplays(currentSpeed = null) {
        if (currentSpeed !== null) {
            const displaySpeed = this.isMetric ? currentSpeed : currentSpeed * 0.621371;
            this.elements.currentSpeed.textContent = Math.round(displaySpeed);
            
            // Add warning class for high speeds
            if (displaySpeed > (this.isMetric ? 120 : 75)) {
                this.elements.currentSpeed.classList.add('speed-warning');
            } else {
                this.elements.currentSpeed.classList.remove('speed-warning');
            }
        }

        if (this.speeds.length > 0) {
            const maxSpeed = Math.max(...this.speeds);
            const avgSpeed = this.speeds.reduce((a, b) => a + b, 0) / this.speeds.length;
            
            const displayMaxSpeed = this.isMetric ? maxSpeed : maxSpeed * 0.621371;
            const displayAvgSpeed = this.isMetric ? avgSpeed : avgSpeed * 0.621371;
            
            this.elements.maxSpeed.textContent = Math.round(displayMaxSpeed);
            this.elements.avgSpeed.textContent = Math.round(displayAvgSpeed);
        }
    }

    updateDistance(lastPos, currentPos) {
        const distance = this.calculateDistance(
            lastPos.latitude, lastPos.longitude,
            currentPos.latitude, currentPos.longitude
        );
        
        this.totalDistance += distance;
        const displayDistance = this.isMetric ? this.totalDistance / 1000 : this.totalDistance / 1609.34;
        this.elements.distance.textContent = displayDistance.toFixed(2);
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Earth's radius in meters
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in meters
    }

    updateLocationInfo(position) {
        const { latitude, longitude, accuracy, altitude } = position.coords;
        
        // Update accuracy with color coding
        this.elements.accuracy.textContent = `${Math.round(accuracy)}m`;
        this.elements.accuracy.className = this.getAccuracyClass(accuracy);
        
        // Update altitude
        if (altitude !== null) {
            this.elements.altitude.textContent = `${Math.round(altitude)}m`;
        } else {
            this.elements.altitude.textContent = 'N/A';
        }
        
        // Update coordinates
        this.elements.coordinates.textContent = 
            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }

    getAccuracyClass(accuracy) {
        if (accuracy <= 10) return 'accuracy-good';
        if (accuracy <= 50) return 'accuracy-medium';
        return 'accuracy-poor';
    }

    updateDuration() {
        if (!this.startTime) return;
        
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        this.elements.duration.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateStatus(icon, text, type) {
        const statusElement = this.elements.status;
        const iconElement = statusElement.querySelector('.status-icon');
        const textElement = statusElement.querySelector('.status-text');
        
        iconElement.textContent = icon;
        textElement.textContent = text;
        
        // Remove previous status classes
        statusElement.classList.remove('status-error', 'status-warning', 'status-success');
        
        // Add new status class
        if (type === 'error') statusElement.classList.add('status-error');
        if (type === 'warning') statusElement.classList.add('status-warning');
        if (type === 'tracking') statusElement.classList.add('status-success');
    }

    handleError(error) {
        let message = 'Location error occurred';
        
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = 'Location access denied. Please enable location services.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Location information unavailable.';
                break;
            case error.TIMEOUT:
                message = 'Location request timed out.';
                break;
        }
        
        this.updateStatus('❌', message, 'error');
        this.stopTracking();
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}

// Initialize the speed meter when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SpeedMeter();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
} 