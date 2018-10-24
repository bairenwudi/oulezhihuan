<style lang="less" scope>
    @import './table.less';
</style>

<template>
    <div>
        <!-- table -->
        <Table :columns="columns" :data="data" :loading="loading"></Table>
        <!-- 分页 -->
        <div class="pageView">
            <Page @on-change="pageChange" :total="total" :current="current" show-total show-elevator/>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
               
            }
        },

        props: {
            // 具体数据
            data: {
                type: Array,
                default: false
            },
            // 表头数据
            columns: {
                type: Array,
                default: false
            },
            // 总页数
            total: {
                type: Number,
                default: false
            },
            // 当前页
            current: {
                type: Number,
                default: 1
            },
            // loading
            loading: {
                type: Boolean,
                default: false
            }
        },
        
        methods: {
            // 点击页面触发的事件
            pageChange(currentPage) {
                this.$emit('pageChange', currentPage);
            }
        }
    }
</script>