# Sử dụng Node.js phiên bản LTS
FROM node:20-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Đảm bảo thư mục /app và các file được sở hữu bởi user "node"
RUN chown -R node:node /app

# Chuyển sang chạy dưới user "node" (non-root) để tăng bảo mật
USER node

# Cài đặt dependencies (với quyền của user "node" bây giờ)
RUN npm install

# Copy toàn bộ mã nguồn, đảm bảo file được sở hữu bởi user node
COPY --chown=node:node . .

# Expose cổng 3000
EXPOSE 3000

# Chạy ứng dụng (giả sử trong package.json có script "dev": "nodemon src/index.js")
CMD ["npm", "run", "dev"]
