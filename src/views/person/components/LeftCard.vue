<template>
  <div class="left-person-card">
    <!-- 头像 -->
    <div class="avatar-box">
      <el-upload
        class="person-avatar-uploader"
        action="#"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadHandle"
      >
        <img
          v-if="appStore.useUserInfoStore.userInfo.avatar"
          :src="appStore.useUserInfoStore.userInfo.avatar"
          class="avatar"
        />
        <el-avatar v-else :size="70">
          {{
            appStore.useUserInfoStore.userInfo.name
              ? appStore.useUserInfoStore.userInfo.name.split('')[0]
              : 'S'
          }}
        </el-avatar>

        <!-- 相机图标 -->
        <div class="camera-box">
          <svg-icon icon-name="icon-xiangji1" class="iconfont" color="#fff" size="20px"></svg-icon>
        </div>
      </el-upload>
    </div>
    <!-- 菜单 -->
    <person-menu-vue></person-menu-vue>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { UploadProps } from 'element-plus';
  import PersonMenuVue from './PersonMenu.vue';
  import { uploadFile, getFileUrl } from '@/http/api/oss';
  import { updateUserInfoAsync } from '@/http/api/user';

  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
  // 上传文件地址
  const uploadHandle = async (options: any) => {
    const objKey = await uploadFile('template/preview', options.file);
    const avatarUrl = await getFileUrl(objKey);
    let data = {
      avatar: avatarUrl
    };
    const res = await updateUserInfoAsync(data);
    if (res.status === 200) {
      getAndUpdateUserInfo();
    }
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('头像大小不能大于5M');
      return false;
    }
    return true;
  };
</script>
<style lang="scss" scoped>
  .left-person-card {
    width: 300px;
    min-height: 400px;
    border-radius: 5px;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 25%);
    background-color: rgba(#fff, 0.5);
    z-index: 2;
    margin-top: 90px;

    .avatar-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;

      .person-avatar-uploader {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        // overflow: hidden;
        position: relative;

        .camera-box {
          position: absolute;
          right: 6px;
          bottom: -7px;
        }

        :deep(.el-upload) {
          width: 70px;
          height: 70px;
          border: 1px solid #ccc !important;
          border-radius: 50%;

          .avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
