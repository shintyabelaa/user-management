# User Management Platform

Mini project ini adalah aplikasi web responsif berbasis **Next.js** yang dirancang untuk menampilkan, mengelola, dan mencari data pengguna (*users*) secara dinamis berdasarkan integrasi dengan API eksternal yang telah disediakan.

## 🌐 Live Demo
Aplikasi telah di-deploy dan dapat diakses secara publik melalui tautan berikut:
🔗 [User Management - Vercel Live Demo](https://user-management-five-delta.vercel.app/users)

---

## 🚀 Fitur Utama

**Dynamic User Directory**: Menampilkan daftar pengguna secara informatif dalam bentuk kartu (*cards*) atau komponen UI yang bersih, terstruktur, dan modern.
- **URL-Driven State (Filtering & Pagination)**: 
  - Fitur pencarian pengguna secara *real-time* yang sinkron dengan URL (`?search=query`).
  - Fitur navigasi halaman yang dinamis via query parameter (`?page=number`) untuk memastikan performa data tetap optimal.
- **Dynamic Routing**: Menyediakan halaman detail dinamis (`/users/[id]`) untuk menampilkan informasi spesifik dan mendalam dari masing-masing pengguna.

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan ekosistem pengembangan web modern:

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment Platform**: [Vercel](https://vercel.com/)

---

## 📂 Struktur Navigasi & URL Dinamis

Aplikasi ini menggunakan pendekatan *state management* berbasis URL agar kondisi halaman mudah dilacak dan dapat dibagikan (*shareable*):

- **Halaman Utama / Direktori**: `/users`
- **Halaman Detail Pengguna**: `/users/[id]`
- **Query Parameters (Opsional)**: `/users?page=[page_number]&search=[query_keyword]`

  
Aplikasi ini menggunakan pendekatan *state management* berbasis URL agar kondisi halaman dapat dibagikan (*shareable*):

```path
/users/[id]?page=[page_number]&search=[query_keyword]
