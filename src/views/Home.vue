<template>
    <div>
        <el-form :inline="true" :model="query" size="mini">
            <el-form-item label="审批人">
                <el-input v-model="query.name" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <div>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="onInsert">添加</el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="onDelete">删除</el-button>
        </div>

        <el-table
                border
                size="mini"
                :data="tableData"
                @dblclick="onUpdate"
        height="600">
            <el-table-column
                    type="selection">
            </el-table-column>
            <el-table-column
                    type="index"
                    label="序号">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="100">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column prop="parentId" label="父ID" width="100"></el-table-column>
            <el-table-column prop="name" label="名称" width="100"></el-table-column>
            <el-table-column prop="url" label="地址" width="100"></el-table-column>
            <el-table-column prop="type" label="类型" width="100"></el-table-column>
            <el-table-column prop="icon" label="图标" width="100"></el-table-column>
            <el-table-column prop="orderNum" label="序号" width="100"></el-table-column>
            <el-table-column prop="perms" label="权限" width="100"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150">
                <template slot-scope="scope">
                    {{scope.row.createTime}}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="200"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="text" size="mini" @click="onUpdate(scope.row)">修改</el-button>
                        <el-button type="text" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改" :visible.sync="updateDialogVisible">
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
                <el-button @click="updateDialogVisible = false">取 消</el-button>
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
            updateDialogVisible: false,
            tableData: [],
            query: {
                name: "",
                type: "",
                deleted: false,

                pageSize: 20,
                total: 0,
                currentPage: 1
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
        async refresh() {
            const {data} = await this.list();
            this.tableData = data.data
        },
        async init() {
            await this.refresh();
        },
        onSubmit() {
            this.refresh()
            console.log(this.query)
        },
        handleClick() {
        },
        onInsert() {
            this.updateDialogVisible = true
        },
        onUpdate(row) {
            this.vo = row;
            this.updateDialogVisible = true
        },
        async onDelete(id) {
            await this.delete(id)
            this.$message.success('success');
            await this.init();
        },
        onSave() {
            if (this.vo.id) {
                this.update(this.vo);
            } else {
                this.insert(this.vo);
            }
            this.updateDialogVisible = false
        },
        get(id) {
            return axios.get('/api/sys/sys_menu/get', {
                params: {
                    id
                }
            });
        },
        list() {
            return axios.post('/api/sys/sys_menu/list', {
                ...this.query
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
        async delete(id) {
            return await axios.post('/api/sys/sys_menu/delete?id=' + id);
        },
    }
}
</script>