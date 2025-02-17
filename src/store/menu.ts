import { getAdminMenuListAsync } from '@/http/api/menu';
import { buildTree } from '@/utils/common';
import { defineStore } from 'pinia';
const menuList = [
  {
    _id: '666c39e4794cb509aa0aa79c',
    parentId: '',
    iconfont: '',
    name: 'Template',
    title: '在线制作',
    path: '/resume',
    index: 1,
    status: 1,
    createDate: '2024-06-14T12:39:00.650Z',
    updateDate: '2024-12-04T10:03:46.798Z',
    __v: 0
  },
  {
    _id: '666c3a7b794cb509aa0aa7ba',
    parentId: '666c3a13794cb509aa0aa7a4',
    iconfont: '',
    name: 'Word',
    title: '简历模板',
    path: '/word',
    index: 1,
    status: 2,
    createDate: '2024-06-14T12:41:31.686Z',
    updateDate: '2024-06-14T12:41:56.145Z',
    __v: 0
  },
  {
    _id: '666c39ff794cb509aa0aa7a0',
    parentId: '',
    iconfont: '',
    name: 'LegoTemplateList',
    title: '积木创作',
    path: '/legoTemplateList',
    index: 2,
    status: 1,
    createDate: '2024-06-14T12:39:27.803Z',
    updateDate: '2024-06-14T12:39:55.526Z',
    __v: 0
  },
  {
    _id: '666c3a13794cb509aa0aa7a4',
    parentId: '',
    iconfont: '',
    name: 'TemplateDownload',
    title: '模板下载',
    path: '',
    index: 2,
    status: 2,
    createDate: '2024-06-14T12:39:47.360Z',
    updateDate: '2024-12-30T04:16:39.492Z',
    __v: 0
  },
  {
    _id: '666c3aff794cb509aa0aa7dd',
    parentId: '666c3a13794cb509aa0aa7a4',
    iconfont: '',
    name: 'PPT',
    title: 'PPT模板',
    path: '/ppt',
    index: 2,
    status: 2,
    createDate: '2024-06-14T12:43:43.187Z',
    updateDate: '2024-06-14T12:45:35.786Z',
    __v: 0
  }
];
// 用户信息
export const useIndexMenuStore = defineStore('indexMenuStore', () => {
  const indexMenuList = ref<any>([]);
  const adminMenuList = ref<any>([]);
  function saveIndexMenu(indexMenu: any) {
    indexMenuList.value = indexMenu;
  }

  function saveAdminMenu(indexMenu: any) {
    adminMenuList.value = indexMenu;
  }

  // 查询首页导航信息
  async function getIndexMenuList() {
    const treeData = buildTree(menuList);
    console.log('首页导航菜单', treeData);
    saveIndexMenu(treeData);
  }

  // 查询管理页菜单信息
  async function getAdminMenuList() {
    const data = await getAdminMenuListAsync();
    if (data.data.status === 200) {
      const treeData = buildTree(data.data.data);
      console.log('首页导航菜单', treeData);
      saveAdminMenu(treeData);
    } else {
      ElMessage({
        message: data.data.message,
        type: 'error'
      });
    }
  }
  return {
    indexMenuList,
    adminMenuList,
    saveIndexMenu,
    getAdminMenuList,
    getIndexMenuList
  };
});
