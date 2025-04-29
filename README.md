# Teszt webshop

## Célja

Egy egyszerű (hardware) webshop felhasználó és termék kezeléssel.

## Megvalósítása

Svelte, BetterSQLite3, Cloudinary

## Kódbázis szerkezetének magyarázata

- /lib: komponensek
- /lib/db.ts: adatbázis funkciók
- /lib/image.ts: külső kép tároló API
- /routes/\*: oldalak

## APIk leírása

- /admin/newCategory: új kategória létrehozása
- /admin/newProduct: új termék létrehozása
- /basket: törlés kosárból
- /login: bejelentkezés
- /logout: kijelentkezés
- /product/[id]: kosárhoz adás
- /register: regisztráció
- /settings: felhasználói beállítások [TODO]

## Tárolt adatok leírása

- TABLE users: felhasználók
- TABLE sessions: bejelentkezési session-ök
- TABLE product_type: termék kategóriák
- TABLE product: termékek
- TABLE basket: felhasználók kosarai

## Kommunikáció módja

Egyszerű POST hívások Formok-ból.
