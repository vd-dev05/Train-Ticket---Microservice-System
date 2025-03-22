FROM oven/bun:latest

WORKDIR /app

# Copy package.json và bun.lock (nếu có)
COPY package.json bun.lock* ./

# Tạo user "node" với tùy chọn vô hiệu hóa mật khẩu và thay đổi quyền sở hữu thư mục /app
RUN adduser --disabled-password node && chown -R node:node /app

# Chuyển sang chạy dưới user "node"
USER node

# Cài đặt dependencies với Bun
RUN bun install

# Copy toàn bộ mã nguồn vào container, đảm bảo quyền của user node
COPY --chown=node:node . .

# Expose cổng mà ứng dụng lắng nghe (ví dụ: 3002)
EXPOSE 3002

# Chạy ứng dụng với Bun (giả sử file khởi động là src/server.ts)
# CMD ["bun", "run", "src/server.ts"]

CMD bun run dev