## Kriteria 1: Menggunakan Database untuk Menyimpan Data

RESTful API yang Anda bangun haruslah menyimpan data di database PostgreSQL.

Berikut adalah ketentuan kriteria 1.

- Data berhasil disimpan di PostgreSQL.
- Pengelolaan database wajib menggunakan teknik migrationsdengan library node-pg-migrate untuk mengelola struktur tabel.
  - Harus terdapat timestamp pada nama file migration yang dibuat otomatis. Contoh: 1769591657553_create-table-users.js.
- Kredensial database tidak boleh ditulis langsung di kode (hardcoded). Wajib gunakan file .env dengan variabel berikut:
  - PGUSER, PGPASSWORD, PGDATABASE, PGHOST, dan PGPORT.
- Wajib menyimpan nilai host, post di file .env dengan variabel berikut:
  - HOST
  - PORT.
- Aplikasi HTTP Server harus bisa dijalankan dengan perintah npm run start:dev.
  - Pastikan berkas package.json terdapat scripts yang diatur untuk menjalankan HTTP Server.
- Terdapat implementasi middleware untuk validate data dengan Joi.
  - Joi (Direkomendasikan)
- Pengujian mandatory Postman tidak ada yang error.
- Terdapat middleware untuk error handling.
- Menambahkan satu unique constraint di salah satu atribut di sebuah tabel. Misalnya, untuk atribut email di tabel users.
- Normalisasi database telah dilakukan dengan baik, dengan setidaknya terdapat beberapa relasi antar tabel.
- Merancang ERD (Entity Relationship Diagram) dan melampirkannya dalam proyek dalam bentuk image jpg/png dengan format nama berkas: ERD-OpenJob-versi-1.
- Menerapkan query parameter pada endpoint GET /jobs untuk fitur pencarian job. Berikut ketentuan parameternya:
  - ?title: mencari job berdasarkan judul.
  - ?company-name: mencari lagu berdasarkan nama perusahaan.

Semua pengujian Postman, baik wajib maupun opsional, tidak ada yang error.

## Kriteria 2: Menerapkan Autentikasi dan Otorisasi pada RESTful API dengan Express.js

Berikut adalah ketentuan kriteria 2.

- Terdapat implementasi authentications dan authorizations seperti berikut ini.

```text
PUBLIC ENDPOINTS (No Auth Required):

USERS:
POST   /users                      → Register new user
GET    /users/:id                  → Get user profile by ID

COMPANIES:
GET    /companies                  → List all companies
GET    /companies/:id              → Get company detail

CATEGORIES:
GET    /categories                 → List all categories
GET    /categories/:id             → Get category detail

JOBS:
GET    /jobs                       → List all jobs
GET    /jobs/:id                   → Get job detail
GET    /jobs/company/:companyId    → Jobs by company
GET    /jobs/category/:categoryId  → Jobs by category

AUTHENTICATIONS:
POST   /authentications            → Login
PUT    /authentications            → Refresh access token

DOCUMENTS:
GET    /documents                  → Get all documents
GET    /documents/:id              → Get document by ID

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROTECTED ENDPOINTS (Auth Required):

PROFILE:
GET    /profile                    → Get logged-in user profile
GET    /profile/applications       → Get my applications
GET    /profile/bookmarks          → Get my bookmarks

COMPANIES:
POST   /companies                  → Create company
PUT    /companies/:id              → Update company
DELETE /companies/:id              → Delete company

CATEGORIES:
POST   /categories                 → Create category
PUT    /categories/:id             → Update category
DELETE /categories/:id             → Delete category

JOBS:
POST   /jobs                       → Create job
PUT    /jobs/:id                   → Update job
DELETE /jobs/:id                   → Delete job

APPLICATIONS:
POST   /applications               → Apply for job
GET    /applications               → List all applications
GET    /applications/:id           → Get application detail
GET    /applications/user/:userId  → Applications by user
GET    /applications/job/:jobId    → Applications by job
PUT    /applications/:id           → Update application status
DELETE /applications/:id           → Delete application

BOOKMARKS:
POST   /jobs/:jobId/bookmark       → Create bookmark for a job
GET    /jobs/:jobId/bookmark/:id   → Get bookmark detail
DELETE /jobs/:jobId/bookmark       → Delete bookmark by user and job
GET    /bookmarks                  → Get all bookmarks for logged-in user

DOCUMENTS:
POST   /documents                  → Upload document (multipart/form-data)
DELETE /documents/:id              → Delete document

AUTHENTICATIONS:
DELETE /authentications            → Logout

TIPS:
• Semua GET endpoints = PUBLIC (kecuali /applications, /bookmarks, dan /profile)
• Semua POST/PUT/DELETE = PROTECTED (kecuali register & login)
• Protected endpoints memerlukan: Authorization: Bearer <access_token>
• Profile routes (/profile/*) khusus untuk user yang sedang login
• Bookmark routes menggunakan pattern /jobs/:jobId/bookmark
• Documents upload menggunakan multipart/form-data dengan field name 'document'
```

- JWT token harus mengandung payload berisi id user.
- Refresh token memiliki signature yang benar serta terdaftar di database.
- Pengujian mandatory Postman tidak ada yang error.
- Terdapat implementasi middleware auth.
- Terdapat endpoint yang diproteksi (protected route):
  - GET /profile untuk melihat profile user yang sudah login.
  - GET /profile/applications untuk melihat daftar lamaran pekerjaan.
  - GET /profile/bookmarks untuk melihat daftar pekerjaan yang disimpan.
- Nilai secret key token JWT baik Access Token ataupun Refresh Token wajib menggunakan environment variable ACCESS_TOKEN_KEY dan REFRESH_TOKEN_KEY
- Access Token yang dihasilkan JWT memiliki masa berlaku hingga 3 jam setelah diterbitkan.

Semua pengujian Postman, baik wajib maupun opsional, tidak ada yang error.

```text
features/users/
user.controller.js
user.service.js
user.repository.js
user.routes.js
user.schema.js ← gabungan model + validator
```
