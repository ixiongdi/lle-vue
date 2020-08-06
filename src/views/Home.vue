<template>
    <div>
        <el-form :inline="true" :model="query" class="demo-form-inline" size="mini">
            <el-form-item label="审批人">
                <el-input v-model="query.name" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="query.type" placeholder="菜单类型">
                    <el-option label="目录" value="目录"></el-option>
                    <el-option label="菜单" value="菜单"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <div>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="onInsert">添加</el-button>
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="onUpdate">修改</el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="onDelete">删除</el-button>
        </div>

        <el-table
            border
                size="mini"
                :data="tableData"
                style="width: 100%">
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="parentId" label="父ID" width="100"></el-table-column>
            <el-table-column prop="name" label="名称" width="100"></el-table-column>
            <el-table-column prop="url" label="地址" width="100"></el-table-column>
            <el-table-column prop="type" label="类型" width="100"></el-table-column>
            <el-table-column prop="icon" label="图标" width="100"></el-table-column>
            <el-table-column prop="orderNum" label="序号" width="100"></el-table-column>
            <el-table-column prop="perms" label="权限" width="100"></el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间" width="100"></el-table-column>
            <el-table-column prop="gmtModified" label="修改时间" width="100"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="vo" size="mini" label-width="100px">
                <el-form-item label="parentId">
                    <el-input v-model="vo.parentId" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="name">
                    <el-input v-model="vo.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input v-model="vo.url" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="type">
                    <el-input v-model="vo.type" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="icon">
                    <el-input v-model="vo.icon" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="orderNum">
                    <el-input v-model="vo.orderNum" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="perms">
                    <el-input v-model="vo.perms" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import axios from 'axios';

    // axios.defaults.baseURL = 'http://localhost:8080';
    // axios.defaults.withCredentials = true;

    export default {
        data() {
            return {
                dialogFormVisible: false,
                tableData: [],
                query: {
                    name: "",
                    type: ""
                },
                vo: {
                    id: "",
                    parentId: "",
                    name: "",
                    url: "",
                    type: "",
                    icon: "",
                    orderNum: "",
                    perms: ""
                },
            }
        },
        created() {
            this.init();
        },
        methods: {
            async init() {
                const response = await this.list();

                console.log(response)
                this.tableData = response.data.data;
            },
            onSubmit() {
                console.log(this.query)
            },
            handleClick() {
            },
            onInsert() {
                this.dialogFormVisible = true
            },
            onUpdate() {
            },
            onDelete() {
            },
            onSave() {
                if (this.vo.id) {
                    this.update(this.vo);
                } else {
                    this.insert(this.vo);
                }
            },
            get(id) {
                return axios.get('/api/sys/sys_menu/get', {
                    params: {
                        id
                    }
                });
            },
            list(form) {
                return axios.get('/api/sys/sys_menu/list', {
                    params: {
                        ...form
                    }
                });
            },
            save(form) {
                return axios.put('/api/sys/sys_menu/save', {
                    data: {
                        ...form,
                    }
                });
            },
            insert(form) {
                return axios.post('/api/sys/sys_menu/insert', {
                   ...this.vo
                });
            },
            update(form) {
                return axios.post('/api/sys/sys_menu/update', {
                    data: {
                        ...form,
                    }
                });
            },
            remove(id) {
                return axios.delete('/api/sys/sys_menu/remove', {
                    params: {
                        id
                    }
                });
            },
            delete(id) {
                return axios.delete('/api/sys/sys_menu/delete', {
                    params: {
                        id
                    }
                });
            },
        }
    }
</script>