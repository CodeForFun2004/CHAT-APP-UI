# ✅ Kế hoạch phát triển Frontend ChatApp (ReactJS + Redux)

---

## 🎯 Giai đoạn 1: Cấu trúc dự án + Đăng nhập cơ bản

### ✅ Mục tiêu:
- Thiết lập cấu trúc dự án ReactJS
- Kết nối API backend
- Tạo Redux store (authSlice)
- Trang đăng nhập / đăng ký
- Lưu accessToken vào Redux và localStorage

### 📁 Thư mục:
```
src/
├── api/               # Axios instance
├── redux/
│   ├── store.js
│   └── slices/
│       └── authSlice.js
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx (optional)
├── components/
│   └── Navbar.jsx
├── App.jsx
└── index.js
```

### 🔧 Công việc:
- `npx create-react-app chatapp-frontend`
- `npm install react-router-dom @reduxjs/toolkit react-redux axios bootstrap`
- Tạo Axios instance ở `api/axios.js`
- Cấu hình Redux + `authSlice`: login, logout, lưu token
- Tạo UI `LoginPage`, xử lý login
- Navbar hiển thị đúng trạng thái đăng nhập / đăng xuất
- Trang chủ `HomePage` hiện username nếu đã login

---

## 🔄 Giai đoạn 2: Refresh Token + Bảo vệ route

### ✅ Mục tiêu:
- Gửi accessToken qua headers khi gọi API
- Tự động dùng refreshToken để lấy accessToken mới
- Route riêng chỉ cho người dùng đã đăng nhập

### 📌 Công việc:
- Axios interceptor: nếu token hết hạn → tự refresh
- PrivateRoute.jsx: kiểm tra trạng thái đăng nhập
- Logout nếu refresh token không hợp lệ

---

## 💬 Giai đoạn 3: Chat UI + hiển thị message

### ✅ Mục tiêu:
- Giao diện danh sách channel
- Giao diện chat room
- Hiển thị tin nhắn và thông tin người gửi

### 📌 Công việc:
- Trang `ChannelListPage.jsx`, `ChatRoomPage.jsx`
- Redux slice: `channelSlice`, `messageSlice`
- Gọi API lấy danh sách channel và message
- Hiển thị theo channel

---

## 📤 Giai đoạn 4: Gửi tin nhắn + Socket.IO real-time

### ✅ Mục tiêu:
- Gửi tin nhắn lên server
- Kết nối và nhận tin nhắn real-time qua socket.io
- (Optional) seen status, người đang gõ, đang online

### 📌 Công việc:
- Tích hợp socket.io-client
- Lắng nghe sự kiện nhận tin nhắn
- Tự động hiển thị khi có message mới

---

## 🛡️ Giai đoạn 5: Trang Admin (dashboard)

### ✅ Mục tiêu:
- Trang admin quản lý người dùng, channel, message
- Ban / unban user
- Phân quyền: user / admin

### 📌 Công việc:
- DashboardPage.jsx
- API: GET users, PATCH ban, thống kê
- Giao diện đơn giản bằng Bootstrap

---

✅ *Sau khi hoàn thành các giai đoạn này, bạn sẽ có một ứng dụng ChatApp MERN stack full chức năng và bảo mật chuẩn.*