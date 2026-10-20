ملفات التطبيق (كلها في مجلد واحد بدون مجلدات فرعية):
index.html  manifest.json  sw.js
icon-192.png  icon-512.png  maskable-192.png  maskable-512.png
apple-touch-icon.png  favicon-32.png

النشر من موبايل Android على GitHub Pages (مجاني + HTTPS):
1) افتح github.com من Chrome وسجّل دخول (أو أنشئ حساب).
2) New repository > الاسم مثلا: bassem-lessons > Public > Create.
3) Add file > Upload files > اختر الملفات التسعة كلها مرة واحدة > Commit changes.
4) Settings > Pages > Source: Deploy from a branch > Branch: main / (root) > Save.
5) استنى دقيقة وهيظهر الرابط: https://USERNAME.github.io/bassem-lessons/
6) افتح الرابط في Chrome على الموبايل.

التثبيت: القائمة ⋮ > Install app (أو Add to Home screen).

ملاحظة مهمة: البيانات محفوظة في المتصفح على نفس الجهاز ونفس الرابط.
لو غيّرت الرابط/الدومين، البيانات القديمة مش هتظهر: خد نسخة احتياطية الأول من داخل التطبيق.
عند تعديل أي ملف لاحقا: غيّر VERSION في sw.js (مثلا v2).
