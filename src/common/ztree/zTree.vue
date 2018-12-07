<template>
	<div class="ztree" id="tree"></div>
</template>

<script>
import "@/plugins/ztree/js/jquery.ztree.core.js";
import "@/plugins/ztree/js/jquery.ztree.excheck.min.js";
export default {
  name: "z-tree",
  props: ["data"],
  methods: {
    getFolder() {
      var ztree_setting = {
        data: {
          simpleData: {
            enable: true
          }
        },
        check: {
          enable: true,
          chkboxType: { Y: "ps", N: "ps" },
          checked: "isChecked"
        },
        callback: {
          // onRename:_this.onRename,
          onClick: this.clickNode
        },
        view: {
          showIcon: true
        }
      };
      //初始化
      this.ztree = $.fn.zTree.init($("#tree"), ztree_setting, this.data);
    },
    //点击的回调函数 固定写法 获得当前的ID值，最重要的后台数据配置
    clickNode(e, treeid, treeNode, clickFlag) {
      console.log(treeNode);
      this.$emit("clickNode", e, treeid, treeNode, clickFlag);
    }
  },
  mounted() {
    this.getFolder();
  }
};
</script>

<style scoped>
  @import "~@/plugins/ztree/css/zTreeStyle/zTreeStyle.css";
.ztree {
  display: inline-block;
}
</style>