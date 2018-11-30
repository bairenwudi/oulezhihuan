<template lang="html">
  <div id="example">
      <tree-table :data="data" :listLoading="listLoading">
        <template slot="column">
          <el-table-column align="center" prop="" label="" :sortable="false" width="30">
              <template slot-scope="scope">
                  <label for="radio">
                    <Radio v-model="ss">我是</Radio>
                      <!-- <el-radio class="radio">我是</el-radio> -->
                  </label>
              </template>
          </el-table-column>

          <el-table-column label="名称" prop="label"></el-table-column>

          <el-table-column label="等级" prop="id"></el-table-column>

          <el-table-column
            align="center"
            label="操作">
                <template slot-scope="scope">
                  <Button type="primary" size="large">按钮</Button>
                </template>
          </el-table-column>
        </template>
      </tree-table>
  </div>
</template>

<script>

import treeTable from '@/common/TreeTable'
  export default {
    name: 'example',
    components: {
      treeTable
    },
    data() {
      return {
        listLoading: false,
        ss: '',
        props: {
          stripe: false,
          border: false,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: true,
        },
        data: [{"id":"8c371318a0cd443189736c1cd9d3bbb9","label":"短视频","vue_component":"home/home","adm_url":"/duanshipin","Children":[{"id":"c79c1b899fab4f0389a320297be6b7b8","label":"举报列表","vue_component":"lp-shortV/tipOffList","adm_url":"tipOffList","pid":"8c371318a0cd443189736c1cd9d3bbb9","Children":[]},{"id":"e78c2b7b4c4d4927a9c8e155c881adec","label":"个人主页","vue_component":"lp-shortV/selfPage","adm_url":"selfPage","pid":"8c371318a0cd443189736c1cd9d3bbb9","Children":[]}]},{"id":"1503016331374dea9a9fc2df7fe0509d","label":"活动管理(管理员)","vue_component":"home/home","adm_url":"/huodong","Children":[{"id":"09c0cb5488794571930b24bec7fc8e32","label":"报名视频上传","vue_component":"lp-activity-administrator/signUpVideoView","adm_url":"signUpVideoView","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"0a73a554daf04059afb64c83b41bced6","label":"报名管理","vue_component":"lp-activity-administrator/activityView","adm_url":"activityView","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"39fda10b15b3431082b04b4093a74aae","label":"活动轮次手动管理","vue_component":"lp-activity-administrator/onOrOff","adm_url":"onOrOff","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"3f3bff9dd0164d0d84dc4aa37bbaf3b2","label":"轮次晋级管理","vue_component":"lp-activity-administrator/roundsPromotion","adm_url":"roundsPromotion","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"4037ec680e8741e3acd6c86e971947d5","label":"活动手动晋级管理","vue_component":"lp-activity-administrator/activityPromotionHandle","adm_url":"activityPromotionHandle","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"836c5f87875846c69e6c193a597e4e0b","label":"活动晋级管理","vue_component":"lp-activity-administrator/activityPromotion","adm_url":"activityPromotion","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"86b44ec72bcd47f2881fc3a293c298b6","label":"轮次管理","vue_component":"lp-activity-administrator/rounds","adm_url":"rounds","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"88e3f5d309a24638bc0306c17f27233e","label":"活动管理","vue_component":"lp-activity-administrator/vote","adm_url":"vote","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"a31308e2becb48b4aedc8ca52df2a6c0","label":"规则管理","vue_component":"lp-activity-administrator/rule","adm_url":"rule","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]},{"id":"fda52d572725406f9eaa97a406348466","label":"轮次手动晋级管理","vue_component":"lp-activity-administrator/roundsPromotionHandle","adm_url":"roundsPromotionHandle","pid":"1503016331374dea9a9fc2df7fe0509d","Children":[]}]},{"id":"8f6e0346aab84ba79f4a4f9f35776b4a","label":"活动管理(赛区)","vue_component":"home/home","adm_url":"/huodong","Children":[{"id":"4240a1bd545d4825a9efb9e35c3132e9","label":"报名视频上传","vue_component":"lp-activity-division/signUpVideoView","adm_url":"signUpVideoView","pid":"8f6e0346aab84ba79f4a4f9f35776b4a","Children":[]},{"id":"9b4c5ee13c43412faf305da04498bb3b","label":"报名管理","vue_component":"lp-activity-division/activityView","adm_url":"activityView","pid":"8f6e0346aab84ba79f4a4f9f35776b4a","Children":[]}]},{"id":"d0867d8387984bd0afb5fec89ca27f6a","label":"配置管理","vue_component":"home/home","adm_url":"/peizhi","Children":[{"id":"5e238fb35b8e40a3825d19e145dd741e","label":"兑换类型","vue_component":"lp-config/exchangeType","adm_url":"exchangeType","pid":"d0867d8387984bd0afb5fec89ca27f6a","Children":[]},{"id":"819be01d0a3340f3aaf27d35a68546e1","label":"货币类型","vue_component":"lp-config/currencyType","adm_url":"currencyType","pid":"d0867d8387984bd0afb5fec89ca27f6a","Children":[]},{"id":"e60bd424222143fa99ba5df6c97bc0c4","label":"充值类型","vue_component":"lp-config/rechargeType","adm_url":"rechargeType","pid":"d0867d8387984bd0afb5fec89ca27f6a","Children":[]},{"id":"e862dcd8bdc84cfaaa126e3c5e4bb766","label":"礼物类型","vue_component":"lp-config/giftType","adm_url":"giftType","pid":"d0867d8387984bd0afb5fec89ca27f6a","Children":[]}]},{"id":"e8e073ba219f4a368c05328b0d88ca90","label":"字典管理","vue_component":"home/home","adm_url":"/zidian","Children":[{"id":"06cd03f2d0904ffe8fdb2b8f7702a5fe","label":"马甲","vue_component":"lp-dictionary/vest","adm_url":"vest","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"09244e3188e14b95baad162bf5df4abb","label":"Banner管理","vue_component":"lp-dictionary/bannerManagement","adm_url":"bannerManagement","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"20ff95a157e842d3804d6ea545e4a440","label":"精彩视频分类","vue_component":"lp-dictionary/excellentVideo","adm_url":"excellentVideo","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"882235422a50439cb4966cdcd2f0f566","label":"直播间推送消息","vue_component":"lp-dictionary/listPush","adm_url":"listPush","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"8b482d078ecb4eccb842f870880f6c94","label":"可提现金额","vue_component":"lp-dictionary/availableAmount","adm_url":"availableAmount","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"9091d104b91f464cb91d258cf4f3855f","label":"机器人规则","vue_component":"lp-dictionary/robotRules","adm_url":"robotRules","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"9943bdaa249841d49b9adc3fbcc7b8c6","label":"直播分类","vue_component":"lp-dictionary/directClass","adm_url":"directClass","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"b81abfbbe17f44e982ef28f2ddece510","label":"意见反馈管理","vue_component":"lp-dictionary/feedback","adm_url":"feedback","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"cf399fa41ffb4fe5b030e4d5b339efbf","label":"短视频分类","vue_component":"lp-dictionary/videoClass","adm_url":"videoClass","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"d0b5f9f470c04d6fb912e3d19d09367d","label":"举报原因列表","vue_component":"lp-dictionary/reasonsList","adm_url":"reasonsList","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]},{"id":"ede6e20793aa427c9f21eaa8953eed2f","label":"直播兴趣爱好标签","vue_component":"lp-dictionary/interestLabel","adm_url":"interestLabel","pid":"e8e073ba219f4a368c05328b0d88ca90","Children":[]}]},{"id":"2f2a84c6453643de80c882d45047405c","label":"系统管理","vue_component":"home/home","adm_url":"/xitong","Children":[{"id":"114db78f48ce46adacff91ffee22af1b","label":"app权限","vue_component":"lp-permissions/appUser","adm_url":"appUser","pid":"2f2a84c6453643de80c882d45047405c","Children":[]},{"id":"4875466360c74d58bb79d39e6400896a","label":"权限管理","vue_component":"lp-permissions/rightsManagement","adm_url":"rightsManagement","pid":"2f2a84c6453643de80c882d45047405c","Children":[]},{"id":"816851f8da594212a2d6f3fa883dc727","label":"机构管理","vue_component":"lp-permissions/organizationManagement","adm_url":"organizationManagement","pid":"2f2a84c6453643de80c882d45047405c","Children":[]},{"id":"aac076bd4e164ec2acf6888a637fa233","label":"角色管理","vue_component":"lp-permissions/roleManagement","adm_url":"roleManagement","pid":"2f2a84c6453643de80c882d45047405c","Children":[]},{"id":"ae8fa91ff07347249de8ded993f3e7b7","label":"用户管理","vue_component":"lp-permissions/userManagement","adm_url":"userManagement","pid":"2f2a84c6453643de80c882d45047405c","Children":[]}]},{"id":"e4c880f270044023babf2ae9c4b1ee1a","label":"投票管理","vue_component":"home/home","adm_url":"/toupiao","Children":[{"id":"ab486564fff44ccea6934a5b20d897c4","label":"投票管理","vue_component":"lp-vote/voteParents","adm_url":"voteParents","pid":"e4c880f270044023babf2ae9c4b1ee1a","Children":[]}]},{"id":"b806680b6a5f4f58b7c854879335043f","label":"直播管理","vue_component":"home/home","adm_url":"/zhibo","Children":[{"id":"2de01d25ff824452a20b8b101b072233","label":"精彩视频管理","vue_component":"lp-live/wonderfulVideo","adm_url":"wonderfulVideo","pid":"b806680b6a5f4f58b7c854879335043f","Children":[]},{"id":"457aaee0642b4e8fb740a67fc928b009","label":"主播管理","vue_component":"lp-live/hostManagementView","adm_url":"hostManagementView","pid":"b806680b6a5f4f58b7c854879335043f","Children":[]},{"id":"e08f2bf2881246f69423378699b0259d","label":"用户管理","vue_component":"lp-live/userManagementLive","adm_url":"userManagementLive","pid":"b806680b6a5f4f58b7c854879335043f","Children":[]},{"id":"f676dcf75e3d4da7946341ff3369bdc9","label":"主播审核","vue_component":"lp-live/hostAuditView","adm_url":"hostAuditView","pid":"b806680b6a5f4f58b7c854879335043f","Children":[]}]},{"id":"7881001736b94d129af29d0c1d85ede4","label":"充值提现管理","vue_component":"home/home","adm_url":"/chongzhi","Children":[{"id":"28655d4fee63437c991f0283e418a541","label":"礼物记录","vue_component":"lp-record/giftRec","adm_url":"giftRec","pid":"7881001736b94d129af29d0c1d85ede4","Children":[]},{"id":"3447e6bee6c44cc7a65817562bd59993","label":"助力记录","vue_component":"lp-record/helpRec","adm_url":"helpRec","pid":"7881001736b94d129af29d0c1d85ede4","Children":[]},{"id":"49321849b2124033b9e163e3a611e285","label":"投票记录","vue_component":"lp-record/voteRec","adm_url":"voteRec","pid":"7881001736b94d129af29d0c1d85ede4","Children":[]},{"id":"83a43442d41a41b6a0d876a4a60cf82f","label":"消费记录","vue_component":"lp-record/consumeRec","adm_url":"consumeRec","pid":"7881001736b94d129af29d0c1d85ede4","Children":[]},{"id":"8fe5dc15296148df8bc80f30dddcdff2","label":"提现记录","vue_component":"lp-record/cashRec","adm_url":"cashRec","pid":"7881001736b94d129af29d0c1d85ede4","Children":[]},{"id":"e2ee4068ab6e4b1d8c1624d414934efb","label":"充值记录","vue_component":"lp-record/rechargeRec","adm_url":"rechargeRec","pid":"7881001736b94d129af29d0c1d85ede4","Children":[]}]},{"id":"bead7f909e194c70af0d2f5aba4cc462","label":"充值兑换管理","vue_component":"home/home","adm_url":"/duihuan","Children":[{"id":"178143b82cc44a338b50faf31db09882","label":"自定义充值规则管理","vue_component":"lp-recharge/rechargeRules","adm_url":"rechargeRules","pid":"bead7f909e194c70af0d2f5aba4cc462","Children":[]},{"id":"4b62cbc3f2a7465485332fb7978f93d5","label":"自定义兑换规则","vue_component":"lp-recharge/selfRecharge","adm_url":"selfRecharge","pid":"bead7f909e194c70af0d2f5aba4cc462","Children":[]},{"id":"efe1027c68f241f982a6466cd3b06968","label":"鸥币金额及赠送管理",
        "vue_component":"lp-recharge/obDonation","adm_url":"obDonation","pid":"bead7f909e194c70af0d2f5aba4cc462","Children":[]},{"id":"fb913dc901ad4ccd81e749ede3054eb3","label":"金币金额及赠送管理","vue_component":"lp-recharge/coinDonation","adm_url":"coinDonation","pid":"bead7f909e194c70af0d2f5aba4cc462","Children":[]}]},{"id":"b09a1be0b8414b019a8da4844cfe0282","label":"礼物管理","vue_component":"home/home","adm_url":"/liwu","Children":[{"id":"62dcff8814cf4c188bf0a93257c9f0e2","label":"我的包裹","vue_component":"lp-gift/myParcel","adm_url":"myParcel","pid":"b09a1be0b8414b019a8da4844cfe0282","Children":[]},{"id":"9254b9a9b6214350a6b0cb16ff37a44c","label":"助力礼物","vue_component":"lp-gift/helpGift","adm_url":"helpGift","pid":"b09a1be0b8414b019a8da4844cfe0282","Children":[]},{"id":"a8c22d5f5df94cd99cd9ed2c9b416099","label":"金币礼物","vue_component":"lp-gift/goldGift","adm_url":"goldGift","pid":"b09a1be0b8414b019a8da4844cfe0282","Children":[]},{"id":"e804a7ab558e477781793b072b79d1a5","label":"特惠礼物","vue_component":"lp-gift/specialGift","adm_url":"specialGift","pid":"b09a1be0b8414b019a8da4844cfe0282","Children":[]}]}],
      };
    },
    computed: {
      propList() {
        return Object.keys(this.props).map(item => ({
          name: item,
        }));
      },
    },
    methods: {

    },
  };
</script>
 
<style scoped lang="less">
  * {
    margin: 0;
    padding: 0;
  }

  .switch-list {
    margin: 20px 0;
    list-style: none;
    overflow: hidden;
  }

  .switch-item {
    margin: 20px;
    float: left;
  }

  .ivu-btn-large {
    padding: 6px 15px 7px !important;
    font-size: 14px;
    border-radius: 4px;
  }
</style>
