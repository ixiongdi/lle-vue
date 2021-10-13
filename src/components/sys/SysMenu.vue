<template>
    <div>
        <el-form :inline="true" :model="query" size="mini">
            <el-form-item label="菜单名称">
                <el-input v-model="query.name" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>

        <div>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="onAdd">添加</el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="onDelete">删除</el-button>
        </div>

        <el-table
                border
                size="mini"
                :data="page.records"
                @dblclick="onRead"
                @selection-change="onSelectionChange"
                height="300">
            <el-table-column
                    type="selection">
            </el-table-column>
            <el-table-column
                    type="index"
                    label="序号">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="100">
                <template slot-scope="scope">
                    {{ scope.row.id }}
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
                    {{ scope.row.createTime }}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="200"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="text" size="mini" @click="onEdit(scope.row)">修改</el-button>
                        <el-button type="text" size="mini" @click="onDelete(scope.row)">删除</el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                @size-change="onSizeChange"
                @current-change="onCurrentChange"
                :current-page="page.current"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
        </el-pagination>

        <el-dialog title="修改" :visible.sync="editDialogVisible">
            <el-form :model="form" size="mini" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="parentId">
                            <el-input v-model="form.parentId" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="name">
                            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="url">
                            <el-input v-model="form.url" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="type">
                            <el-input v-model="form.type" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="icon">
                            <el-input v-model="form.icon" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="orderNum">
                            <el-input v-model="form.orderNum" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="perms">
                            <el-input v-model="form.perms" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" native-type="submit" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import Breads from '../common/Breads'

export default {
    name: "SysMenu",
    extends: Breads,
    data() {
        return {
            package: 'sys',
            class: 'sys_menu',
            form: {
                id: "",
                parentId: "",
                name: "",
                url: "",
                type: "",
                icon: "",
                orderNum: "",
                perms: ""
            }
        }
    },
    created() {
        this.onBrowse()
    },
    methods: {}
}
</script>