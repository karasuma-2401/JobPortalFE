# Authentication Flow

## I. Login

### API

`POST /auth/login`

1. Người dùng nhập email và mật khẩu để đăng nhập.
2. Hệ thống kiểm tra thông tin tài khoản:
    - Nếu tài khoản không tồn tại hoặc thông tin đăng nhập không hợp lệ, hệ thống hiển thị thông báo:

        > "Email hoặc mật khẩu không chính xác."

3. Nếu đăng nhập thành công, hệ thống gọi API `GET /auth/me` để lấy thông tin người dùng hiện tại.
4. Dựa trên dữ liệu trả về từ `/auth/me`:
    - Nếu người dùng **chưa tạo Profile** tương ứng với vai trò của mình (`EMPLOYER` | `SEEKER`), hệ thống sẽ chuyển hướng đến màn hình tạo Profile.
    - Nếu người dùng **đã có Profile**, hệ thống chuyển hướng đến trang chính của hệ thống.

### Điều hướng

| Role     | Chưa có Profile          | Đã có Profile        |
| -------- | ------------------------ | -------------------- |
| EMPLOYER | Employer Profile Setup   | Employer Dashboard   |
| SEEKER   | Job Seeker Profile Setup | Job Seeker Dashboard |

---

## II. Register

### API

`POST /auth/register`

1. Người dùng nhập các thông tin:
    - Email
    - Password
    - Confirm Password
    - Đồng ý với Điều khoản sử dụng (Terms of Service)

2. Sau khi gửi biểu mẫu đăng ký:
    - Hệ thống tạo tài khoản ở trạng thái **chưa xác thực email**.
    - Hệ thống gửi một email xác thực đến địa chỉ email đã đăng ký.

3. Người dùng mở email và nhấn vào liên kết xác thực.

4. Frontend gọi API:

    `POST /auth/verify`

5. Nếu xác thực thành công:
    - Tài khoản được kích hoạt.
    - Người dùng được chuyển hướng về màn hình đăng nhập.

### Kết quả

- Email đã xác thực thành công.
- Người dùng có thể đăng nhập vào hệ thống.

---

## III. Forgot Password

### Bước 1: Yêu cầu đặt lại mật khẩu

#### API

`POST /auth/reset-password`

#### Flow

1. Người dùng chọn chức năng **Forgot Password** tại màn hình đăng nhập.
2. Người dùng nhập địa chỉ email đã đăng ký.
3. Hệ thống kiểm tra email:
    - Nếu email không tồn tại, hiển thị thông báo lỗi phù hợp.
    - Nếu email hợp lệ, hệ thống tạo một Reset Password Token và gửi email chứa liên kết đặt lại mật khẩu.

---

### Bước 2: Truy cập liên kết đặt lại mật khẩu

1. Người dùng mở email.
2. Người dùng nhấn vào liên kết đặt lại mật khẩu.

Ví dụ:

`https://winpear/reset-password?token=xxxxx`

3. Hệ thống chuyển hướng đến màn hình **Reset Password**.

---

### Bước 3: Đặt mật khẩu mới

#### API

`POST /auth/reset-password/verify`

#### Flow

1. Người dùng nhập:
    - New Password
    - Confirm Password

2. Hệ thống kiểm tra:
    - Token còn hiệu lực.
    - Token chưa được sử dụng.
    - Mật khẩu mới hợp lệ.

3. Nếu hợp lệ:
    - Cập nhật mật khẩu mới.
    - Đánh dấu token đã được sử dụng.
    - Hiển thị thông báo thành công.

4. Người dùng được chuyển hướng về màn hình đăng nhập.

### Kết quả

- Mật khẩu được cập nhật thành công.
- Người dùng có thể đăng nhập bằng mật khẩu mới.
