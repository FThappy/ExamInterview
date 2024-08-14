# Hướng dẫn chạy dự án

## Lưu ý

1. Đường dẫn [https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66b9a0496cf694.99441544] chặn truy cập từ Local, do đó không thể tạo refresh token tự động bằng cách gọi API từ đường dẫn này (lỗi CORS).
2. Bạn cần truy cập vào đường dẫn trên để lấy token thủ công và dán vào file `.env`.

3. Lỗi đang gặp phải : Access to fetch at 'https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66b9a0496cf694.99441544' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled. Không thể tạo tự động token do server chặn cors.

## Cách chạy dự án

 1. git clone

 2. chạy lệnh npm i

 3. tạo file .env

 4. Truy cập đường dẫn <https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66b9a0496cf694.99441544> lấy token

 5. Tạo biến môi trường. 
 
VITE_BASE_URL = 'https://b24-1y8hov.bitrix24.vn/rest/user.get.json?auth='

VITE_REFRESH_TOKEN = https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66b9a0496cf694.99441544

 6. npm run dev
