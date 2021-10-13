<script>
import axios from 'axios';

export default {
    name: 'Breads',
    data() {
        return {
            package: '',
            class: '',

            query: {},
            form: {
                id: undefined,
                ids: []
            },
            page: {
                size: 10,
                total: undefined,
                current: 1,
                records: []
            },

            readDialogVisible: false,
            editDialogVisible: false,
        }
    },
    methods: {
        /**
         * BREADS
         * 浏览（Browse）、读取（Read）、编辑（Edit）、创建（Add）、删除（Delete）、搜索（Search）
         */
        onBrowse() {
            this.list();
        },
        onRead(e) {
            this.form.id = e.id
            this.get();
            this.readDialogVisible = true
        },
        onEdit(e) {
            this.form.id = e.id
            this.get();
            this.editDialogVisible = true
        },
        onAdd() {
            this.form = {}
            this.editDialogVisible = true
        },
        onDelete(e) {
            if (e.id) {
                this.form.ids = [e.id]
            }
            this.remove();
        },
        onSearch() {
            this.list()
        },
        onSubmit() {
            if (this.form.id) {
                this.update()
            } else {
                this.save()
            }
        },
        onSizeChange(size) {
            this.page.size = size;
            this.list();
        },
        onCurrentChange(current) {
            this.page.current = current;
            this.list()
        },
        onSelectionChange(selection) {
            this.form.ids = selection.map(e => e.id)
        },
        async get() {
            await axios.post(`/api/${this.package}/${this.class}/get`, {
                id: this.form.id
            }).then((res) => {
                const {code, data, message} = res.data
                this.form = data;
            })
        },
        async list() {
            await axios.post(`/api/${this.package}/${this.class}/list`, {
                ...this.query,
                ...this.page
            }).then((res) => {
                const {code, data, message} = res.data
                this.page = data;
            })
        },
        async count() {
            await axios.post(`/api/${this.package}/${this.class}/count`, {
                ...this.query
            }).then((res) => {
                const {code, data, message} = res.data
                this.page.total = data
            })
        },
        async save() {
            await axios.post(`/api/${this.package}/${this.class}/save`, {
                ...this.form
            }).then((res) => {
                const {code, data, message} = res.data
                if (data) {
                    this.$message.success('创建成功');
                    this.editDialogVisible = false;
                    this.list();
                }
            })
        },
        async insert() {
            await this.save()
        },
        async remove() {
            await axios.post(`/api/${this.package}/${this.class}/remove`, {
                ids: this.form.ids
            }).then((res) => {
                const {code, data, message} = res.data
                if (data) {
                    this.$message.success('删除成功');
                    this.list();
                }
            })
        },
        async delete() {
            await this.remove()
        },
        async update() {
            await axios.post(`/api/${this.package}/${this.class}/update`, {
                ...this.form
            }).then((res) => {
                const {code, data, message} = res.data
                if (data) {
                    this.$message.success('更新成功');
                    this.editDialogVisible = false;
                    this.list();
                }
            })
        },
    }
}
</script>