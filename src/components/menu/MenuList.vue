<script setup lang="ts">

const list = [
  {
    "ID": 3,
    "CreatedAt": "2024-04-05T21:33:06+08:00",
    "UpdatedAt": "2024-04-05T21:33:06+08:00",
    "DeletedAt": null,
    "name": "系统",
    "component": "nulla officia sunt aliqua eu",
    "icon": "http://dummyimage.com/100x100",
    "parentId": null,
    "router": "Excepteur mollit aute aliquip dolor",
    "sort": 1,
    "type": 0,
    "uri": "Duis sint",
    "children": [
      {
        "ID": 4,
        "CreatedAt": "2024-04-06T18:49:10+08:00",
        "UpdatedAt": "2024-04-06T18:49:10+08:00",
        "DeletedAt": null,
        "name": "用户管理",
        "component": "veniam cupidatat exercitation",
        "icon": "http://dummyimage.com/100x100",
        "parentId": 9,
        "router": "magna adipisicing velit pariatur",
        "sort": 1,
        "type": 1,
        "uri": "occaecat fugiat nostrud dolore",
        "children": null
      },
      {
        "ID": 5,
        "CreatedAt": "2024-04-06T18:49:15+08:00",
        "UpdatedAt": "2024-04-06T18:49:15+08:00",
        "DeletedAt": null,
        "name": "角色管理",
        "component": "nulla mollit",
        "icon": "http://dummyimage.com/100x100",
        "parentId": 9,
        "router": "esse ipsum",
        "sort": 1,
        "type": 1,
        "uri": "elit proident labore",
        "children": null
      }
    ]
  },
  {
    "ID": 9,
    "CreatedAt": "0001-01-01T00:00:00Z",
    "UpdatedAt": "0001-01-01T00:00:00Z",
    "DeletedAt": null,
    "name": "超级管理员",
    "component": null,
    "icon": null,
    "parentId": null,
    "router": null,
    "sort": null,
    "type": 0,
    "uri": null,
    "children": [
      {
        "ID": 4,
        "CreatedAt": "2024-04-06T18:49:10+08:00",
        "UpdatedAt": "2024-04-06T18:49:10+08:00",
        "DeletedAt": null,
        "name": "用户管理",
        "component": "veniam cupidatat exercitation",
        "icon": "http://dummyimage.com/100x100",
        "parentId": 9,
        "router": "magna adipisicing velit pariatur",
        "sort": 1,
        "type": 1,
        "uri": "occaecat fugiat nostrud dolore",
        "children": null
      },
      {
        "ID": 5,
        "CreatedAt": "2024-04-06T18:49:15+08:00",
        "UpdatedAt": "2024-04-06T18:49:15+08:00",
        "DeletedAt": null,
        "name": "角色管理",
        "component": "nulla mollit",
        "icon": "http://dummyimage.com/100x100",
        "parentId": 9,
        "router": "esse ipsum",
        "sort": 1,
        "type": 1,
        "uri": "elit proident labore",
        "children": null
      },
      {
        "ID": 6,
        "CreatedAt": "2024-04-06T18:49:22+08:00",
        "UpdatedAt": "2024-04-06T18:49:22+08:00",
        "DeletedAt": null,
        "name": "权限管理",
        "component": "laboris ad",
        "icon": "http://dummyimage.com/100x100",
        "parentId": 9,
        "router": "magna adipisicing velit pariatur",
        "sort": 1,
        "type": 1,
        "uri": "tempor in Ut",
        "children": null
      }
    ]
  }
]

</script>

<template>
  <div class="menuList box">
    <div class="menu">
      <div class="logo">
        <slot name="logo">LOGO</slot>
      </div>
      <div class="list" v-for="item in list" :key="item.ID">
        <div class="title">{{ item.name }}</div>
        <div class="child">
          <div class="sub" v-for="i in item.children" :key="i.ID">
            <div class="i">{{ i.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.menuList {
  height: 100vh;
  width: 256px;

  .menu {
    margin: 0 20px;
    height: 100%;

    .logo {
      margin-top: 10px;
      height: 80px;
      background-color: aliceblue;
    }

    .list {
      .title {
        font-weight: bold;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid #f0f0f0;
        color: #8c8cbc;
        margin-bottom: 20px;
        text-indent: 2em;
      }
      .child{
        text-indent: 4em;
        font-size: 15px;
        .sub{
          margin: 5px 10px;
          border-radius: 6px;
          .i{
            height: 30px;
            line-height: 30px;
            cursor: pointer;
          }
        }
        .sub:hover{
          background-color: rgba(0, 0, 0, .1);
        }
      }
    }
  }
}
</style>
