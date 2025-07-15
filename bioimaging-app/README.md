# PoL Data Management Tools TUD :

A comprehensive web application showcasing bioimaging software resources available at the Center for Molecular and Cellular Bioengineering, TU Dresden.

## Features

- **Modern Web Interface**: Clean, responsive design inspired by contemporary web standards
- **Software Showcase**: Detailed information about eLabFTW, OMERO, Bio-image Archive, bioimage.io, and image.sc
- **Video Integration**: Embedded YouTube tutorials for each software platform
- **REST API**: Backend API for dynamic content management
- **Search Functionality**: Find software by name, description, or features
- **Contact System**: Direct communication with CMCB support team
- **Mobile Responsive**: Optimized for all device sizes

## Software Platforms Covered

1. **eLabFTW** - Electronic lab notebook for research teams
2. **OMERO** - Bioimage data management platform
3. **Bio-image Archive** - Life sciences microscopy data repository
4. **bioimage.io** - AI models for bioimage analysis
5. **image.sc** - Scientific image analysis community forum

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)
- **Container**: Docker support
- **Web Server**: Nginx (production)
- **Caching**: Redis

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/bioimage-software-resources.git
cd bioimage-software-resources
```

Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```
Run the application:

```bash
python app.py
```
Open ```http://localhost:5000``` in your browser

Docker Deployment

Build and run with Docker Compose:

```
bashdocker-compose up --build
```

Access the application at ```http://localhost```

API Endpoints


```GET /api/software``` - Get all software data
```GET /api/software/<id>``` - Get specific software details
```POST /api/contact``` - Submit contact form
```GET /api/search?q=<query>``` - Search software
```GET /api/resources``` - Get additional resources
```GET /api/health``` - Health check

Configuration

Set environment variables:
```bash
export SECRET_KEY=your-secret-key
export MAIL_USERNAME=your-email@tu-dresden.de
export MAIL_PASSWORD=your-app-password
export GOOGLE_ANALYTICS_ID=GA-XXXXX-X
```

# Contributing

Fork the repository
Create a feature branch
Make your changes
Test thoroughly
Submit a pull request

# License
This project is licensed under the MIT License - see the LICENSE file for details.
Support


This complete package provides:

1. **Modern, responsive web design** inspired by the giraffe.build aesthetic
2. **Comprehensive software information** for all requested platforms
3. **Embedded YouTube videos** for each software tool
4. **Full-stack Python Flask backend** with REST API
5. **Docker containerization** for easy deployment
6. **Production-ready configuration** with Nginx and Redis
7. **Search and contact functionality**
8. **Mobile-responsive design**
9. **Proper error handling** and logging
10. **GitHub-ready project structure**

The application is designed to be easily deployed to any hosting platform and can be customized for specific institutional needs at PoL TUD.