<template>
    <div>
        <h2>上传图片</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for = "file">选择图片</label>
                <input type = "file" id="file" @change="handleFileChange" />
            </div>

            <div>
                <button type="submit" :disabled="!file">上传</button>
            </div>
        </form>
        <div v-if="imageUrl">
            <h3>图片已上传</h3>
            <img :src="imageUrl" alt="Uploaded Image" width="300" />
            <p>图片链接： <a :href="imageUrl" target="_blank">{{ imageUrl }}</a></p>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'FileUpload',
    data(){
        return{
            file: null,
            imageUrl: ''
        };
    },
    methods: {
        handleFileChange(event) {
            this.file = event.target.files[0];  // 获取选中的文件
        },
        async submitForm(){
            const formData = new FormData()
            formData.append('image', this.file)

            try{
                const response = await axios.post('http://localhost:3000/upload', formData, {
                });
                console.log('File uploaded successfully:', response.data.imageUrl);
                this.imageUrl = response.data.imageUrl;
            }catch(error){
                console.error('Error uploading image:', error);
            }
        }
    }
};
</script>