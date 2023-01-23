<template>
  <div class="department">
    <el-card>
      <el-tabs>
        <el-tab-pane label="组织结构">
          <div class="main">
            <div class="upper">
              <p class="name"><i class="el-icon-s-home"></i> 生化狂魔渣渣辉科技有限公司</p>
              <div class="handle">
                <p class="manager">负责人</p>
                <el-dropdown>
                  <span class="el-dropdown-link"> 操作 <i class="el-icon-arrow-down"></i> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="addEvent('')">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <el-tree :data="list" :props="{ label: 'name', children: 'children' }">
              <template v-slot="{ data }">
                <div class="lower">
                  <div class="left">{{ data.name }}</div>
                  <div class="right">{{ data.manager }}</div>
                  <el-dropdown>
                    <div>
                      <span>操作</span>
                      <i class="el-icon-arrow-down"></i>
                    </div>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click.native="addEvent(data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="editEvent(data)">编辑部门</el-dropdown-item>
                        <el-dropdown-item @click.native="delEvent(data.id)">删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </el-tree>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <Dialog ref="dia" @getData="getData" :initList="initList"></Dialog>
  </div>
</template>

<script>
import { companyDepartment, companyDepartmentDelete } from '@/api/department'
import { handleTree } from '@/utils'
import Dialog from '@/views/departments/components/Dialog.vue'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      list: [],
      initList: [] //传给子组件做自定义表单验证
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await companyDepartment()
      console.log(res)
      this.initList = res.data.depts
      this.list = handleTree(res.data.depts, '')
    },
    // 新增部门
    addEvent(pid) {
      this.$refs.dia.isShow = true
      this.$refs.dia.form.pid = pid
      this.$refs.dia.mode = 'add'
    },
    // 编辑部门
    editEvent(data) {
      this.$refs.dia.isShow = true
      this.$refs.dia.form = JSON.parse(JSON.stringify(data))
      this.$refs.dia.mode = 'edit'
    },
    // 删除部门
    async delEvent(id) {
      await companyDepartmentDelete(id)
      this.$message.success('删除成功')
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.department {
  padding: 15px;
  .main {
    padding: 0 125px;
    .upper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      height: 35px;
      .name {
        font-weight: 700;
      }
      .handle {
        display: flex;
        align-items: center;
        width: 150px;
        justify-content: space-between;
      }
    }
    .lower {
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 50px;
        flex: 1;
      }
      .right {
        margin-right: 56px;
      }
    }
  }
}
</style>
