<template>
  <div class="upload-container">
    <div class="upload-box">
      <!-- 选择图片按钮 -->
      <mu-button class="upload-btn" @click="triggerFileInput">
        添加图片
      </mu-button>

      <!-- 隐藏的文件选择框 -->
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        style="display: none;"
        accept="image/*"
      />

      <!-- 图片预览 -->
      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="Preview Image" />
      </div>

      <!-- 上传按钮，放在图片下方 -->
      <mu-button class="submit-btn" @click="handleUpload" v-if="imagePreview">
        上传
      </mu-button>

      <!-- 上传后的图片链接 -->
      <div v-if="imageUrl" class="image-url">
        <p>图片上传成功！</p>
        <p>图片链接：<a :href="imageUrl" target="_blank">{{ imageUrl }}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 引入 axios
import { MuButton } from 'muse-ui'; // 导入 Muse UI 的 MuButton 组件

export default {
  components: {
    MuButton, // 注册 MuButton 组件
  },
  data() {
    return {
      file: null,        // 上传的文件
      imagePreview: '',  // 上传前图片预览
      imageUrl: '',      // 上传后图片的 URL
    };
  },
  methods: {
    // 触发文件选择
    triggerFileInput() {
      this.$refs.fileInput.click(); // 手动点击文件输入框
    },
    
    // 处理文件选择
    handleFileChange(event) {
      const file = event.target.files[0]; // 获取文件
      if (file) {
        this.file = file;
        // 使用 FileReader 显示图片预览
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result; // 设置图片预览
        };
        reader.readAsDataURL(file); // 读取文件内容
      }
    },

    // 上传文件
    async handleUpload() {
      if (!this.file) {
        alert('请先选择图片');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.file);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData);
        this.imageUrl = response.data.imageUrl; // 获取上传的图片链接
        this.imagePreview = ''; // 清除图片预览
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('上传失败！');
      }
    },
  },
};
</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.upload-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 保证按钮始终在图片下方 */
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: auto;
  height: auto;
}

.upload-btn {
  background-color: #3498DB; /* 设置背景色为 #3498DB */
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  transition: background-color 0.3s, box-shadow 0.3s; /* 平滑过渡效果 */
}

.upload-btn:hover {
  background-color: #2980b9; /* 鼠标悬停时，改变按钮颜色 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); /* 增加阴影的强度 */
}

.submit-btn {
  background-color: #28a745;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #218838;
}

.image-preview {
  margin-top: 20px;
  max-width: 100%;
  text-align: center; /* 图片居中 */
}

.image-preview img {
  max-width: 100%;   /* 限制图片的最大宽度 */
  height: auto;      /* 使图片高度自动适应，保持比例 */
  object-fit: contain; /* 确保图片不变形，按照比例缩放 */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image-url {
  margin-top: 20px;
  font-size: 16px;
}

.image-url a {
  color: #007bff;
  text-decoration: none;
}

.image-url a:hover {
  text-decoration: underline;
}
</style>
