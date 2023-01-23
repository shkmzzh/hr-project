<template>
  <div class="dialog">
    <el-dialog :title="{ add: '新增部门', edit: '编辑部门' }[mode]" :visible.sync="isShow" center @close="handleClose">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="部门名称" prop="name"><el-input v-model="form.name"></el-input></el-form-item>
        <el-form-item label="部门编码" prop="code"><el-input v-model="form.code"></el-input></el-form-item>
        <el-form-item label="部门负责人" prop="manager"><el-input v-model="form.manager"></el-input></el-form-item>
        <el-form-item label="部门介绍" prop="introduce"><el-input v-model="form.introduce" type="textarea" :rows="3" placeholder="请输入内容"></el-input></el-form-item>

        <div style="text-align: center">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { companyDepartmentPost, companyDepartmentPut } from '@/api/department'
export default {
  props: {
    initList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      mode: 'add',
      isShow: false,
      form: {
        name: '', //	string	非必须		部门名称
        code: '', //	string	非必须		部门编码，同级部门不可重复
        manager: '', //	string	非必须		负责人名称
        introduce: '', //	string	非必须		介绍
        pid: '' // string	非必须		父级部门ID
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'change' },
          { min: 1, max: 10, message: '请输入1-10个字符', trigger: 'change' },
          { 
            validator: (rule, value, callback) => {
              if (this.mode === 'add') {
                // 1.同一级别的name不能相同，先筛选出同一级的数据
                const newArr = this.initList.filter((item) => item.pid === this.form.pid)
                // 2.判断同一级中有没有相同的name
                const bol = newArr.every((item) => item.name !== value)
                bol ? callback() : callback(new Error('部门名称已存在'))
              } else if (this.mode === 'edit') {
                // 在编辑状态时不能出现和自己name相同的，但要把自身排除在外
                const newArr = this.initList.filter((item) => item.pid === this.form.pid && item.id !== this.form.id)
                const bol = newArr.every((item) => item.name !== value)
                bol ? callback() : callback(new Error('部门名称已存在'))
              }
            },
            trigger: 'change'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'change' },
          { min: 1, max: 10, message: '请输入1-10个字符', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (this.mode === 'add') {
                const bol = this.initList.every((item) => item.code !== value)
                bol ? callback() : callback(new Error('部门编码重复'))
              } else if (this.mode === 'edit') {
                const newArr = this.initList.filter((item) => item.id !== this.form.id)
                const bol = newArr.every((item) => item.code !== value)
                bol ? callback() : callback(new Error('部门编码重复'))
              }
            },
            trigger: 'change'
          }
        ],
        manager: [
          { required: true, message: '负责人名称不能为空', trigger: 'change' },
          { min: 1, max: 10, message: '请输入1-10个字符', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'change' },
          { min: 1, max: 300, message: '请输入1-300个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (result) => {
        if (result) {
          if (this.mode === 'add') {
            await companyDepartmentPost(this.form)
            this.$message.success('添加成功')
          } else if (this.mode === 'edit') {
            await companyDepartmentPut(this.form)
            this.$message.success('编辑成功')
          }
          this.$emit('getData')
          this.isShow = false
        }
      })
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.name = ''
      this.code = ''
      this.manager = ''
      this.introduce = ''
      this.pid = ''
    }
  }
}
</script>

<style></style>
