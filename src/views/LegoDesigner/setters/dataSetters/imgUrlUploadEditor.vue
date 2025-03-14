<template>
  <div class="avatar-editor">
    <el-form-item label="图片上传:">
      <el-upload
        class="hj-img-uploader"
        action="#"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadHandle"
        accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PNG,.GIF"
      >
        <img
          v-if="widgetItem.dataSource.imgUrl"
          :src="getImgListStyleImageFile(widgetItem.dataSource.imgUrl)"
          class="avatar"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <p class="tips">图片大小不能超过5M，仅支持（jpg、jpeg、png、gif）格式</p>
    </el-form-item>
    <el-form-item label="标签:">
      <el-input v-model="widgetItem.props.label" type="text" />
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { UploadProps } from 'element-plus';
  import useSelectWidgetItem from '../../hooks/useSelectWidgetItem';
  import { getImgListStyleImageFile } from '../../widgets/image/imageList';
  import { uploadFile, getFileUrl } from '@/http/api/oss';

  const props = defineProps<{
    id: string;
    pageIndex: number;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex);

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('图片不能大于5M');
      return false;
    }
    return true;
  };

  const uploadHandle = async (options: any) => {
    const objKey = await uploadFile('resume/img', options.file);
    widgetItem.dataSource.imgUrl = await getFileUrl(objKey);
  };
</script>
<style lang="scss">
  .hj-img-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    min-width: 150px;
    max-width: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .hj-img-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 150px;
    max-width: 300px;
    text-align: center;
  }

  .avatar-editor {
    .tips {
      color: #8c939d;
      font-size: 12px;
      margin-top: 5px;
    }
  }
</style>
