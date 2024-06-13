<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getUserList, deleteUser, addUser, udpateUser } from '@/api/user'
import { getRoleList } from '@/api/role'
import { message, Modal } from 'ant-design-vue'
import dayjs from 'dayjs'

interface Table {
    key: string,
    name: string,
    sex: number,
    phone: string,
    email: string,
    birthday: string,
    Roles: string[],
}

interface AddForm {
    name: string,
    sex: number | undefined,
    username: string,
    phone: string,
    email: string,
    birthday: string,
    roles: string[],
}

interface UpdateForm {
    ID?: number,
    name?: string,
    sex?: number | undefined,
    username?: string,
    phone?: string,
    email?: string,
    birthday?: string,
    roles?: string[],
    CreatedAt?: string,
    UpdatedAt?: string,
    DeletedAt?: string
}

interface Role {
    ID: number,
    name: string,
    desc: string,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string
}

interface Data {
    addModal: boolean,
    updateModal: boolean,
    searchForm: {
        name: string | undefined,
        phone: string | undefined,
        email: string | undefined,
        roles: number[] | undefined
    },
    table: Table[],
    addForm: AddForm,
    updateForm: UpdateForm,
    roleList: Role[],
}

const data = reactive<Data>({
    addModal: false,
    updateModal: false,
    searchForm: {
        name: undefined,
        phone: undefined,
        email: undefined,
        roles: undefined
    },
    table: [],
    addForm: {
        username: '',
        name: '',
        sex: undefined,
        phone: '',
        email: '',
        birthday: '',
        roles: [],
    },
    roleList: [],
    updateForm: {
        username: '',
        name: '',
        sex: undefined,
        phone: '',
        email: '',
        birthday: '',
        roles: [],
    },
})

const temp = ref<UpdateForm>({})

const formatDate = (time: string) => {
    return dayjs(time).format('YYYY-MM-DD')
}

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align: 'center'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        align: 'center'
    },
    {
        title: '角色',
        key: 'roles',
        dataIndex: 'roles',
        align: 'center'
    },
    {
        title: '电话',
        key: 'phone',
        dataIndex: 'phone',
        align: 'center'
    },
    {
        title: '邮箱',
        key: 'email',
        dataIndex: 'email',
        align: 'center'
    },
    {
        title: '出生日期',
        key: 'birthday',
        dataIndex: 'birthday',
        align: 'center'
    },
    {
        title: '操作',
        key: 'action',
        align: 'center'
    },
];

const initRoles = () => {
    getRoleList().then(res => {
        data.roleList = res.data
    })
}

const initData = () => {
    getUserList(data.searchForm).then(res => {
        data.table = res.data
    })
}

const handleSearch = () => {
    initData()
}

const handleEdit = (record: AddForm) => {
    temp.value = record
    getRoleList().then(res => {
        data.roleList = res.data
    })
    data.updateModal = true
}

const resetSearch = () => {
    data.searchForm.name = undefined,
        data.searchForm.phone = undefined,
        data.searchForm.email = undefined,
        data.searchForm.roles = undefined,
        initData()
}

const resetAdd = () => {
    data.addForm.username = '',
        data.addForm.name = '',
        data.addForm.sex = undefined,
        data.addForm.phone = '',
        data.addForm.email = '',
        data.addForm.birthday = '',
        data.addForm.roles = []
}

const openModal = () => {
    data.addModal = true
}

const handleBaseOk = () => {
    addUser(data.addForm).then(res => {
        if (res.rowAffect == 1) {
            message.success('新增成功')
            initData()
        }
    })
    data.addModal = false
    resetAdd()
}

const handleUpdateOk = () => {
    data.updateModal = false
    udpateUser(temp.value).then(res => {
        console.log(res);

    })
}

const handleDelete = (id: number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条记录吗？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
            deleteUser(id).then(res => {
                if (res.rowAffect == 1) {
                    message.success('删除成功')
                    initData()
                }
            })
        },
        onCancel() {
            message.info('取消删除操作')
        },
    });
}

onMounted(() => {
    initData()
    initRoles()
})
</script>

<template>
    <div class="user-manage">
        <div class="search">
            <a-form :model="data.searchForm" name="search" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-row align="middle" justify="center">
                    <a-col :span="6">
                        <a-form-item label="姓名" name="name">
                            <a-input v-model:value="data.searchForm.name" placeholder="请输入姓名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="角色" name="role">
                            <a-select v-model:value="data.searchForm.roles" placeholder="请选择角色" mode="multiple">
                                <a-select-option v-for="i in data.roleList" :key="i.ID" :value="i.ID">{{ i.name
                                }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="电话" name="phone">
                            <a-input v-model:value="data.searchForm.phone" placeholder="请输入电话" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="邮箱" name="email">
                            <a-input v-model:value="data.searchForm.email" placeholder="请输入邮箱" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6"></a-col>
                </a-row>

            </a-form>

        </div>
        <div class="handle">
            <div class="left">
                <a-button class="btn" type="primary" @click="handleSearch">搜索</a-button>
                <a-button class="btn" @click="resetSearch">重置搜索</a-button>
            </div>

            <a-button class="btn" type="primary" @click="openModal">新增</a-button>
        </div>
        <div class="table">
            <a-table :columns="columns" :data-source="data.table" size="small">
                <template #bodyCell="{ record, column }">
                    <template v-if="column.key === 'action'">
                        <a-button type="link" @click="handleEdit(record)">编辑</a-button>
                        <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button>
                    </template>
                    <template v-else-if="column.key === 'sex'">
                        <span>
                            <a-tag>{{ record.sex == 0 ? '女' : '男' }}</a-tag>
                        </span>
                    </template>
                    <template v-else-if="column.key === 'birthday'">
                        {{ formatDate(record.birthday) }}
                    </template>
                    <template v-else-if="column.key === 'roles'">
                        <span>
                            <a-tag v-for="role in record.Roles" :key="role.ID" color="magenta">
                                {{ role.name }}
                            </a-tag>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>

        <a-modal v-model:open="data.addModal" title="新增用户信息" okText="确认" cancelText="取消" @ok="handleBaseOk">
            <a-alert message="系统新增用户的初始密码为123456" type="warning" />
            <a-form style="margin-top: 20px;" :model="data.addForm" name="basic" :label-col="{ span: 5 }"
                :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '姓名不能为空' }]">
                    <a-input v-model:value="data.addForm.name" placeholder="请输入姓名" />
                </a-form-item>
                <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '用户名不能为空' }]">
                    <a-input v-model:value="data.addForm.username" placeholder="请输入用户名" />
                </a-form-item>
                <a-form-item label="角色" name="roles" :rules="[{ required: true, message: '角色不能为空' }]">
                    <a-select v-model:value="data.addForm.roles" placeholder="请选择角色" mode="multiple">
                        <a-select-option v-for="i in data.roleList" :key="i.ID" :value="i.ID">{{ i.name }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="性别" name="sex" :rules="[{ required: true, message: '性别不能为空' }]">
                    <a-select v-model:value="data.addForm.sex" placeholder="请选择性别">
                        <a-select-option :value="1">男</a-select-option>
                        <a-select-option :value="0">女</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="电话" name="phone" :rules="[{ required: true, message: '电话不能为空' }]">
                    <a-input v-model:value="data.addForm.phone" placeholder="请输入电话" />
                </a-form-item>
                <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '邮箱不能为空' }]">
                    <a-input v-model:value="data.addForm.email" placeholder="请输入邮箱" />
                </a-form-item>
                <a-form-item label="生日" name="birthday" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"
                    :rules="[{ required: true, message: '请选择你的出生日期' }]">
                    <a-date-picker v-model:value="data.addForm.birthday" placeholder="请选择出生日期" />
                </a-form-item>
            </a-form>
        </a-modal>

        <a-modal v-model:open="data.updateModal" title="修改用户信息" okText="确认" cancelText="取消" @ok="handleUpdateOk">
            <a-form style="margin-top: 20px;" :model="temp" name="basic" :label-col="{ span: 5 }"
                :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '姓名不能为空' }]">
                    <a-input v-model:value="temp.name" placeholder="请输入姓名" />
                </a-form-item>
                <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '用户名不能为空' }]">
                    <a-input v-model:value="temp.username" placeholder="请输入用户名" />
                </a-form-item>
                <a-form-item label="角色" name="roles" :rules="[{ required: true, message: '角色不能为空' }]">
                    <a-select v-model:value="temp.roles" placeholder="请选择角色" mode="multiple">
                        <a-select-option v-for="i in data.roleList" :key="i.ID" :value="i.ID">{{ i.name }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="性别" name="sex" :rules="[{ required: true, message: '性别不能为空' }]">
                    <a-select v-model:value="temp.sex" placeholder="请选择性别">
                        <a-select-option :value="1">男</a-select-option>
                        <a-select-option :value="0">女</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="电话" name="phone" :rules="[{ required: true, message: '电话不能为空' }]">
                    <a-input v-model:value="temp.phone" placeholder="请输入电话" />
                </a-form-item>
                <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '邮箱不能为空' }]">
                    <a-input v-model:value="temp.email" placeholder="请输入邮箱" />
                </a-form-item>
                <!-- <a-form-item
                label="生日"
                name="birthday"
                format="YYYY-MM-DD"
                :rules="[{ required: true, message: '请选择你的出生日期' }]"
                >
                <a-date-picker v-model:value="temp.birthday" placeholder="请选择出生日期" />
            </a-form-item> -->
            </a-form>
        </a-modal>
    </div>
</template>

<style scoped lang="less">
.user-manage {
    height: 100%;
    padding-top: 20px;

    .search {}

    .handle {
        height: 50px;
        display: flex;
        justify-content: space-between;
        padding-left: 20px;

        .btn {
            margin-right: 20px;
        }
    }

    .table {
        width: 98%;
        margin: 0 auto;
    }
}
</style>
