<template>
<div class="ssss">
	<!-- 校验表单 -->
	<section>
		<el-button type="primary" @click="dialogVisible = true">校验表单</el-button>
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="活动名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="活动区域" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动时间" required>
					<el-col :span="11">
					<el-form-item prop="date1">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
					</el-form-item>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
					<el-form-item prop="date2">
						<el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
					</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="即时配送" prop="delivery">
					<el-switch v-model="ruleForm.delivery"></el-switch>
				</el-form-item>
				<el-form-item label="活动性质" prop="type">
					<el-checkbox-group v-model="ruleForm.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="特殊资源" prop="resource">
					<el-radio-group v-model="ruleForm.resource">
					<el-radio label="线上品牌商赞助"></el-radio>
					<el-radio label="线下场地免费"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="活动形式" prop="desc">
					<el-input type="textarea" v-model="ruleForm.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
				</el-form>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span> -->
		</el-dialog>
	</section>

	<!-- checkbox -->
	<section>
		<el-radio v-model="radio" label="1">备选项</el-radio>
  		<el-radio v-model="radio" label="2">备选项</el-radio>
	</section>
	
	<!-- 走马灯 -->
	<el-button type="primary" @click="dialogVisible2 = true">走马灯效果</el-button>
	<el-dialog :visible.sync="dialogVisible2">
		<el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
		</el-carousel>
	</el-dialog>

	<!-- 上传图片 -->
	<section>
		<el-upload
			action="/"
			list-type="picture-card"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove"
			:before-upload="beforeAvatarUpload">
		<i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible1">
		<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</section>

	<!-- 视频 -->
	<section class="video_section">
		<video-player  class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
		 @play="onPlayerPlay($event)"
     @pause="onPlayerPause($event)"
		></video-player>

		<video-player  class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
		 @play="onPlayerPlay($event)"
     @pause="onPlayerPause($event)"
		></video-player>

	</section>
	</div>
</template>

<script>
export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src:
              "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        poster: "https://img-bss.csdn.net/201881617010376_54549.gif", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      radio: "1",
      dialogImageUrl: "",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    OnFullscreenToggle() {
      console.log(
        document.isFullScreen ||
          document.mozIsFullScreen ||
          document.webkitIsFullScreen
      );
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "image/png"
      ) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      } else {
        this.$message.error("上传头像图片只能是 JPGJPEGGIFPNG 格式!");
        return false;
      }
    },
    onPlayerPlay(player) {
      // console.log('onPlayerPlay!', player)
    },
    onPlayerPause(player) {
      // console.log('onPlayerPause!', player)
    },
    // ...player event
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("playerStateChanged", playerCurrentState);
    },
    // player is ready
    playerReadied(player) {
      console.log("playerReadied", player);
    }
  },
  mounted() {
    // 视频 全屏暂停
    var fullscreenBtn = document.getElementsByClassName(
      "vjs-fullscreen-control"
    );
    var videos = document.getElementsByTagName("video");
    for (var i = fullscreenBtn.length - 1; i >= 0; i--) {
      (function() {
        var p = i;
        fullscreenBtn[p].addEventListener("click", function() {
          pauseAll(p);
        });
      })();
    }
    function pauseAll(index) {
      for (var j = videos.length - 1; j >= 0; j--) {
        if (j != index) videos[j].pause();
      }
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
section {
  margin-bottom: 20px;
  margin-top: 30px;
}

.vjs-custom-skin {
  width: 500px;
  margin-bottom: 20px;
}

.video-js .vjs-big-play-button {
  left: 50% !important;
  margin-left: -1.5em;
  top: 50% !important;
  margin-top: -0.7em;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>