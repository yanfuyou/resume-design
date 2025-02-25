<template>
  <el-dialog
    :model-value="dialogVisible"
    title="发布公开简历"
    width="500px"
    :show-close="true"
    :close-on-click-modal="false"
    @close="closeHandle"
  >
    <p>
      你可以将一下链接发送给他人:<br />
      {{ resumeUrl }}
    </p>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  interface TDialog {
    dialogVisible: boolean;
    resumeUrl: string | null;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogVisible: false,
    resumeUrl: null
  });
  const emit = defineEmits(['close']);

  const url = ref<string | null>(null);
  watch(
    () => props.resumeUrl,
    (newVal) => {
      if (newVal) {
        url.value = newVal;
      }
    }
  );

  const closeHandle = () => {
    emit('close');
  };
</script>

<style scoped></style>
