# 🌐 Calquro

**Calquro.com** ek modern multipage website hai jo finance, health, mathematics aur smart tools provide karti hai.  
Is project ka goal users ko accurate calculators, AI tools aur knowledge-based blog articles ek hi jagah par dena hai.  

---

## 🚀 Features
- 🏠 **Home Page** – Developer info, reviews, and introduction  
- 🔢 **Smart Tools** – Multiple calculators & converters (BMI, EMI, Currency, Time, etc.)  
- 🤖 **AI Section** – Smart AI based solutions  
- 📝 **Professional Blog** – 800+ word informative articles  
- 📞 **Contact Page** – Easy communication option  
- ⚖️ **Privacy Policy Page** – Transparency for users  
- 🔍 **SEO Optimized** – Meta tags, sitemap.xml, robots.txt already added  

---

## 📂 Folder Structure
calquro/
├── index.html
├── about.html
├── ai.html
├── blog.html
├── contact.html
├── privacy-policy.html
├── tools.html
├── robots.txt
├── sitemap.xml
├── ads.txt
│
├── blog/
│ ├── age-calculation-mastery-beyond-basic-math.html
│ ├── creating-unbreakable-passwords-2024.html
│ └── ... (other blog pages)
│
├── css/
│ ├── style.css
│ ├── style.min.css
│ └── style.backup.css
│
├── js/
│ ├── main.js
│ ├── main.min.js
│ ├── tools/
│ │ ├── age-calculator.js
│ │ ├── currency-converter.js
│ │ └── ... (other tool scripts)
│
├── tools/
│ ├── age-calculator.html
│ ├── bmi-calculator.html
│ └── ... (other calculators)
│
└── images/
├── logo.png
├── developer.png
└── blog1.jpg ... blog9.jpg

yaml
Copy code

---

## ⚡ Deployment (GitHub Pages + Custom Domain)
1. Repository open karo → **Settings** → **Pages**  
2. Branch select karo → `main` aur folder → `/ (root)`  
3. Save karo → Site live ho jayegi at:  
https://USERNAME.github.io/REPO/

php-template
Copy code
4. Agar aapka **custom domain (calquro.com)** hai:  
- Repo root me `CNAME` file banao jisme likho:  
  ```
  calquro.com
  ```
- Apne domain DNS me **CNAME record** add karo:  
  ```
  www  →  USERNAME.github.io
  ```

---

## 📊 AdSense Integration
- **ads.txt** → root me `ads.txt` file upload (done ✅)  
- **Meta verification tag** → `index.html` ke `<head>` me add (done ✅)  
- **AdSense script** → `index.html` ke `<head>` me add (done ✅)  

### Example `<head>` section (optimized):
```html
<head>
 <!-- AdSense Verification -->
 <meta name="google-adsense-account" content="ca-pub-3150350892607652">

 <!-- AdSense Auto Ads Script -->
 <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3150350892607652"
 crossorigin="anonymous"></script>

 <!-- SEO + Normal Meta -->
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta name="description" content="Calquro - Smart calculators, AI tools, and professional blog for finance, health, and time management.">
 <meta name="keywords" content="Calquro, calculators, AI tools, finance tools, health tools, blog">
 <meta name="author" content="Calquro">

 <!-- Favicon -->
 <link rel="icon" type="image/png" href="images/logo.png">

 <!-- Stylesheet -->
 <link rel="stylesheet" href="css/style.css">

 <title>Calquro - Smart Tools & AI Solutions</title>
</head>