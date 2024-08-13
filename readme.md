# Hướng dẫn chạy dự án

## Lưu ý

1. Đường dẫn [https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66b9a0496cf694.99441544] chặn truy cập từ Local, do đó không thể tạo refresh token tự động bằng cách gọi API từ đường dẫn này (lỗi CORS).
2. Bạn cần truy cập vào đường dẫn trên để lấy token thủ công và dán vào file `.env`.

## Cách chạy dự án

 1. git clone

 2. chạy lệnh npm i

 3. tạo file .env

 4. Truy cập đường dẫn <https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66b9a0496cf694.99441544> lấy token

 5. Tạo biến môi trường. 
 
VITE_BASE_URL = 'https://b24-1y8hov.bitrix24.vn/rest/user.get.json?auth='

VITE_TOKEN = token lấy ở bước 4

 6. npm run dev
