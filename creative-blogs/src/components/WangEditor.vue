// 富文本编辑器
<template>
    <div>
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        class="toolbar"
        v-show="editor1"
      />
       <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef2"
        :defaultConfig="toolbarConfig2"
        :mode="mode"
        class="toolbar"
        v-show="editor2"
      />
      <div class="editable">
        <div class="title-container">
        <textarea class="title"  autocomplete='off' maxlength='25' placeholder='请输入标题(5～25)' @input="gettitle(title)" v-model="title" ></textarea>
        </div>
        <Editor
          style="height: 500px; overflow-y: hidden;"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange='getcontent'
          class="ditor"
          @onFocus='getfocus1'
        />
        <div class="separated"></div>
      <Editor
          style="height: 500px; overflow-y: hidden;"
          :defaultConfig="editorConfig2"
          :mode="mode"
          @onCreated="handleCreated2"
          @onChange='getcontent2'
          class="ditor"
          @onFocus='getfocus2'
        />
      </div>

      <div class="disposition">
          <label for="el-input" class="label">推文摘要：</label>
          <el-input
            rows='3'
            v-model="textarea"
            maxlength="50"
            placeholder="文章在主页面展示时的推文(50字)。"
            if-word-limit
            type="textarea"
            id="el-input"
            class="elinput"
            resize='none'
          />
          <label for="el-upload" class="label2">封面：</label>
            <el-upload
               list-type="picture-card"
               :auto-upload="false"
               ref="upload"
               action=""
               :limit="1"
               class="el-upload"
               id="el-upload"
               :show-file-list="false"
               :before-upload="beforeImageUpload"
               :on-change='UploadImage'
               v-if="!imgurl"
             >
             <svg t="1691636689028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2979" width="200" height="200"><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z" fill="#575B66" p-id="2980"></path></svg>
            </el-upload>
            <div v-if="imgurl">
              <el-image :src="imgurl" class="img"></el-image>
              <svg t="1692173479477" @click="Reupload" class="icon2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4193" width="200" height="200"><path d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z" fill="#272636" p-id="4194"></path><path d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z" fill="#272636" p-id="4195"></path></svg>
            </div>
      </div>
      <div class="button">
        <el-button
          :key="primary"
          size="large"
          text
          bg
          class="btn"
          @click="Dataaggregation('submit')"
          >提交审核</el-button
        >
      </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { ElMessage, ElMessageBox,genFileId } from 'element-plus'
import axios from "axios"
export default {
  components: { Editor, Toolbar },
  //编辑器实例
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const editorRef2 = shallowRef()

    const toolbarConfig = {}
    toolbarConfig.toolbarKeys =[
      "headerSelect",
      "bold",
      {
        key:'group-more-style',
        title:'更多',
        iconSvg:'<svg t="1690947523536" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2304" width="200" height="200"><path d="M746.662019 512c0 51.835575 42.044582 93.865831 93.865831 93.865831 51.851948 0 93.865831-42.029232 93.865831-93.865831 0-51.836599-42.013883-93.865831-93.865831-93.865831C788.706601 418.135192 746.662019 460.163401 746.662019 512z" fill="#A8A8A8" p-id="2305"></path><path d="M89.604272 512c0 51.835575 42.043558 93.865831 93.864808 93.865831 51.822272 0 93.865831-42.029232 93.865831-93.865831 0-51.836599-42.043558-93.865831-93.865831-93.865831C131.648854 418.135192 89.604272 460.163401 89.604272 512z" fill="#A8A8A8" p-id="2306"></path><path d="M418.132634 512c0 51.835575 42.013883 93.865831 93.866854 93.865831 51.821249 0 93.864808-42.029232 93.864808-93.865831 0-51.836599-42.043558-93.865831-93.864808-93.865831C460.146517 418.135192 418.132634 460.163401 418.132634 512z" fill="#A8A8A8" p-id="2307"></path></svg>',
        menuKeys:[
          "underline",
          "italic",
          'through',
          "divider"
        ]
      },
      "color",
      "bgColor",
      "fontSize",
      "lineHeight",
      {
        key:'group-list',
        title:'列表',
        iconSvg:'<svg t="1690947559213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3289" width="200" height="200"><path d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z" fill="#272536" p-id="3290"></path><path d="M349.405343 154.62259 155.596266 154.62259c-29.150924 0-52.873208 23.724331-52.873208 52.845579l0 193.823404c0 29.150924 23.722284 52.844555 52.873208 52.844555l193.810101 0c29.136597 0 52.859905-23.693632 52.859905-52.844555L402.266271 207.467145C402.265248 178.345897 378.541941 154.62259 349.405343 154.62259M351.851045 207.467145l0 193.823404c0 1.339508-1.106194 2.474354-2.445702 2.474354L155.596266 403.764903c-1.338485 0-2.503007-1.134847-2.503007-2.474354L153.093259 207.467145c0-1.38351 1.134847-2.474354 2.503007-2.474354l193.810101 0C350.774527 204.992791 351.851045 206.084659 351.851045 207.467145" fill="#231F20" p-id="3291"></path><path d="M349.405343 569.837266 155.596266 569.837266c-29.150924 0-52.873208 23.75196-52.873208 52.856835L102.723058 816.519552c0 29.164227 23.722284 52.857858 52.873208 52.857858l193.810101 0c29.136597 0 52.859905-23.693632 52.859905-52.857858L402.266271 622.694101C402.265248 593.589227 378.541941 569.837266 349.405343 569.837266M351.851045 622.694101 351.851045 816.519552c0 1.36816-1.106194 2.472308-2.445702 2.472308L155.596266 818.99186c-1.338485 0-2.503007-1.104147-2.503007-2.472308L153.093259 622.694101c0-1.367137 1.134847-2.474354 2.503007-2.474354l193.810101 0C350.774527 620.219747 351.851045 621.326964 351.851045 622.694101" fill="#231F20" p-id="3292"></path><path d="M519.857457 224.930889c0.727571 0.480954 1.601474 0.801249 2.532683 0.801249l1.77646 0c0.434905 0.058328 0.900509 0.058328 1.36816 0l367.768061 0c0.233314 0.029676 0.493234 0.058328 0.697895 0.058328 0.233314 0 0.466628-0.028653 0.670266-0.058328l1.454118 0c0.787946 0 1.514493-0.261966 2.124384-0.626263 12.023848-2.081405 20.900006-12.341073 20.900006-24.464181 0-11.949146-8.586562-22.064528-20.345374-24.348548-0.756223-0.566912-1.687432-0.931209-2.679016-0.931209L522.389116 175.361937c-0.901533 0-1.775436 0.422625-2.501984 1.019213-11.614525 2.357697-20.200064 12.458753-20.200064 24.261567C499.687068 212.474183 508.272607 222.574215 519.857457 224.930889" fill="#231F20" p-id="3293"></path><path d="M519.507486 411.493935c0.756223 0.683569 1.77646 1.134847 2.88163 1.134847l373.73496 0c0.903579 0 1.719154-0.39295 2.446725-0.932232 11.818163-2.196015 20.550035-12.369725 20.550035-24.405853 0-12.123109-8.847505-22.354124-20.784372-24.434505-0.668219-0.39295-1.425466-0.596588-2.212388-0.596588l-0.697895 0.115634c-0.581238-0.145309-1.456165-0.203638-2.297322-0.115634l-366.867552 0.115634c-0.611937-0.145309-1.457188-0.203638-2.300392-0.115634l-1.571798 0c-0.814552 0-1.542122 0.233314-2.213411 0.714268-11.786441 2.241041-20.459984 12.398378-20.459984 24.317848C499.715721 398.976854 508.040317 408.990928 519.507486 411.493935" fill="#231F20" p-id="3294"></path><path d="M519.537162 660.680251c0.756223 0.667196 1.775436 1.075495 2.851954 1.075495l373.73496 0c0.408299 0 0.787946-0.058328 1.196245-0.174985 13.271258-0.608867 23.954575-11.641131 23.954575-25.118074 0-13.827937-11.294231-25.118074-25.15082-25.118074-0.202615 0-0.435928 0.027629-0.697895 0.058328L525.50406 611.402941c-0.437975-0.058328-0.873903-0.058328-1.36816 0l-1.746784 0c-0.842181 0-1.600451 0.25992-2.270716 0.725524-11.729136 2.270716-20.402679 12.428054-20.402679 24.334221C499.715721 648.166239 508.097622 658.176221 519.537162 660.680251" fill="#231F20" p-id="3295"></path><path d="M897.755226 777.807878c-0.493234-0.203638-1.077541-0.319272-1.63115-0.319272L522.389116 777.488607c-0.959861 0-1.893116 0.462534-2.589988 1.1328-11.583826 2.416026-20.083407 12.485359-20.083407 24.275893 0 11.904121 8.674567 22.064528 20.402679 24.334221 0.669242 0.405229 1.428535 0.60989 2.270716 0.60989l0.728594-0.115634c0.290619 0.057305 0.726547 0.202615 2.620687 0.115634l368.639918-0.115634c0.466628 0.115634 1.340531 0.290619 1.74576 0.290619 13.856589 0 25.15082-11.291161 25.15082-25.119097C921.274896 789.565666 910.883221 778.679735 897.755226 777.807878" fill="#231F20" p-id="3296"></path></svg>',
        menuKeys:[
          "bulletedList",
          "numberedList",
          "todo",
        ]
      },
      {
        key:'group-justify',
        title:'对齐',
        iconSvg:'<svg t="1690947590571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4269" width="200" height="200"><path d="M96 128h832v96H96zM96 576h832v96H96zM96 352h576v96H96zM96 800h576v96H96z" p-id="4270"></path></svg>',
        menuKeys:[
          'justifyLeft',
          'justifyRight',
          'justifyCenter',
          'justifyJustify',
        ]
      },
      {
        key:'group-indent',
        title:'缩进',
        iconSvg:'<svg t="1690947639467" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5224" width="200" height="200"><path d="M469.3330000000001 725.333H896V640H469.3330000000001v85.333zM128 512l170.667 170.667V341.3330000000001L128 512z m0 384h768v-85.333H128V896z m0-768v85.333h768V128H128z m341.333 256H896v-85.333H469.3330000000001V384z m0 170.667H896v-85.334H469.3330000000001v85.334z" p-id="5225"></path></svg>',
        menuKeys:[
          'indent',
          'delIndent',
        ]
      },
      "insertLink",
      'uploadImage',
      "insertTable",
      "undo",
      "redo"
    ]

    const toolbarConfig2 = {}
    toolbarConfig2.toolbarKeys =[
      "headerSelect",
      "bold",
      {
        key:'group-more-style',
        title:'更多',
        iconSvg:'<svg t="1690947523536" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2304" width="200" height="200"><path d="M746.662019 512c0 51.835575 42.044582 93.865831 93.865831 93.865831 51.851948 0 93.865831-42.029232 93.865831-93.865831 0-51.836599-42.013883-93.865831-93.865831-93.865831C788.706601 418.135192 746.662019 460.163401 746.662019 512z" fill="#A8A8A8" p-id="2305"></path><path d="M89.604272 512c0 51.835575 42.043558 93.865831 93.864808 93.865831 51.822272 0 93.865831-42.029232 93.865831-93.865831 0-51.836599-42.043558-93.865831-93.865831-93.865831C131.648854 418.135192 89.604272 460.163401 89.604272 512z" fill="#A8A8A8" p-id="2306"></path><path d="M418.132634 512c0 51.835575 42.013883 93.865831 93.866854 93.865831 51.821249 0 93.864808-42.029232 93.864808-93.865831 0-51.836599-42.043558-93.865831-93.864808-93.865831C460.146517 418.135192 418.132634 460.163401 418.132634 512z" fill="#A8A8A8" p-id="2307"></path></svg>',
        menuKeys:[
          "underline",
          "italic",
          'through',
          "divider"
        ]
      },
      "color",
      "bgColor",
      "fontSize",
      "lineHeight",
      {
        key:'group-list',
        title:'列表',
        iconSvg:'<svg t="1690947559213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3289" width="200" height="200"><path d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z" fill="#272536" p-id="3290"></path><path d="M349.405343 154.62259 155.596266 154.62259c-29.150924 0-52.873208 23.724331-52.873208 52.845579l0 193.823404c0 29.150924 23.722284 52.844555 52.873208 52.844555l193.810101 0c29.136597 0 52.859905-23.693632 52.859905-52.844555L402.266271 207.467145C402.265248 178.345897 378.541941 154.62259 349.405343 154.62259M351.851045 207.467145l0 193.823404c0 1.339508-1.106194 2.474354-2.445702 2.474354L155.596266 403.764903c-1.338485 0-2.503007-1.134847-2.503007-2.474354L153.093259 207.467145c0-1.38351 1.134847-2.474354 2.503007-2.474354l193.810101 0C350.774527 204.992791 351.851045 206.084659 351.851045 207.467145" fill="#231F20" p-id="3291"></path><path d="M349.405343 569.837266 155.596266 569.837266c-29.150924 0-52.873208 23.75196-52.873208 52.856835L102.723058 816.519552c0 29.164227 23.722284 52.857858 52.873208 52.857858l193.810101 0c29.136597 0 52.859905-23.693632 52.859905-52.857858L402.266271 622.694101C402.265248 593.589227 378.541941 569.837266 349.405343 569.837266M351.851045 622.694101 351.851045 816.519552c0 1.36816-1.106194 2.472308-2.445702 2.472308L155.596266 818.99186c-1.338485 0-2.503007-1.104147-2.503007-2.472308L153.093259 622.694101c0-1.367137 1.134847-2.474354 2.503007-2.474354l193.810101 0C350.774527 620.219747 351.851045 621.326964 351.851045 622.694101" fill="#231F20" p-id="3292"></path><path d="M519.857457 224.930889c0.727571 0.480954 1.601474 0.801249 2.532683 0.801249l1.77646 0c0.434905 0.058328 0.900509 0.058328 1.36816 0l367.768061 0c0.233314 0.029676 0.493234 0.058328 0.697895 0.058328 0.233314 0 0.466628-0.028653 0.670266-0.058328l1.454118 0c0.787946 0 1.514493-0.261966 2.124384-0.626263 12.023848-2.081405 20.900006-12.341073 20.900006-24.464181 0-11.949146-8.586562-22.064528-20.345374-24.348548-0.756223-0.566912-1.687432-0.931209-2.679016-0.931209L522.389116 175.361937c-0.901533 0-1.775436 0.422625-2.501984 1.019213-11.614525 2.357697-20.200064 12.458753-20.200064 24.261567C499.687068 212.474183 508.272607 222.574215 519.857457 224.930889" fill="#231F20" p-id="3293"></path><path d="M519.507486 411.493935c0.756223 0.683569 1.77646 1.134847 2.88163 1.134847l373.73496 0c0.903579 0 1.719154-0.39295 2.446725-0.932232 11.818163-2.196015 20.550035-12.369725 20.550035-24.405853 0-12.123109-8.847505-22.354124-20.784372-24.434505-0.668219-0.39295-1.425466-0.596588-2.212388-0.596588l-0.697895 0.115634c-0.581238-0.145309-1.456165-0.203638-2.297322-0.115634l-366.867552 0.115634c-0.611937-0.145309-1.457188-0.203638-2.300392-0.115634l-1.571798 0c-0.814552 0-1.542122 0.233314-2.213411 0.714268-11.786441 2.241041-20.459984 12.398378-20.459984 24.317848C499.715721 398.976854 508.040317 408.990928 519.507486 411.493935" fill="#231F20" p-id="3294"></path><path d="M519.537162 660.680251c0.756223 0.667196 1.775436 1.075495 2.851954 1.075495l373.73496 0c0.408299 0 0.787946-0.058328 1.196245-0.174985 13.271258-0.608867 23.954575-11.641131 23.954575-25.118074 0-13.827937-11.294231-25.118074-25.15082-25.118074-0.202615 0-0.435928 0.027629-0.697895 0.058328L525.50406 611.402941c-0.437975-0.058328-0.873903-0.058328-1.36816 0l-1.746784 0c-0.842181 0-1.600451 0.25992-2.270716 0.725524-11.729136 2.270716-20.402679 12.428054-20.402679 24.334221C499.715721 648.166239 508.097622 658.176221 519.537162 660.680251" fill="#231F20" p-id="3295"></path><path d="M897.755226 777.807878c-0.493234-0.203638-1.077541-0.319272-1.63115-0.319272L522.389116 777.488607c-0.959861 0-1.893116 0.462534-2.589988 1.1328-11.583826 2.416026-20.083407 12.485359-20.083407 24.275893 0 11.904121 8.674567 22.064528 20.402679 24.334221 0.669242 0.405229 1.428535 0.60989 2.270716 0.60989l0.728594-0.115634c0.290619 0.057305 0.726547 0.202615 2.620687 0.115634l368.639918-0.115634c0.466628 0.115634 1.340531 0.290619 1.74576 0.290619 13.856589 0 25.15082-11.291161 25.15082-25.119097C921.274896 789.565666 910.883221 778.679735 897.755226 777.807878" fill="#231F20" p-id="3296"></path></svg>',
        menuKeys:[
          "bulletedList",
          "numberedList",
          "todo",
        ]
      },
      {
        key:'group-justify',
        title:'对齐',
        iconSvg:'<svg t="1690947590571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4269" width="200" height="200"><path d="M96 128h832v96H96zM96 576h832v96H96zM96 352h576v96H96zM96 800h576v96H96z" p-id="4270"></path></svg>',
        menuKeys:[
          'justifyLeft',
          'justifyRight',
          'justifyCenter',
          'justifyJustify',
        ]
      },
      {
        key:'group-indent',
        title:'缩进',
        iconSvg:'<svg t="1690947639467" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5224" width="200" height="200"><path d="M469.3330000000001 725.333H896V640H469.3330000000001v85.333zM128 512l170.667 170.667V341.3330000000001L128 512z m0 384h768v-85.333H128V896z m0-768v85.333h768V128H128z m341.333 256H896v-85.333H469.3330000000001V384z m0 170.667H896v-85.334H469.3330000000001v85.334z" p-id="5225"></path></svg>',
        menuKeys:[
          'indent',
          'delIndent',
        ]
      },
      "insertLink",
      'uploadImage',
      "insertTable",
      "undo",
      "redo"
    ]

    //编辑器配置
    const editorConfig = { 
      placeholder: '左页内容...',
      MENU_CONF: {}
    }

    const editorConfig2 = { 
      placeholder: '右页内容...',
      MENU_CONF: {}
    }

    //链接
    function customParseLinkUrl(url){
      if (url.indexOf('http') !== 0) {
        return `http://${url}`
      }
      return url
    }

    //链接校验
    editorConfig.MENU_CONF['insertLink'] = {
        parseLinkUrl: customParseLinkUrl
    }

    editorConfig2.MENU_CONF['insertLink'] = {
        parseLinkUrl: customParseLinkUrl
    }


    //图片
    editorConfig.MENU_CONF['uploadImage']={
      server: 'http://localhost:8081/processedimg.php',

      fieldName: 'file',
      maxFileSize: 30 * 1024 * 1024,  //30MB
      maxNumberOfFiles: 1,  //最多上传一个
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],  //设置图片类型
      base64:false,
      
      onBeforeUpload(file){
        console.log(file);
        return file
      },
      onError(file, err, res) {               
        console.log(`${file.name} 上传出错`, err, res)
      },
      onFailed(file, res) {           
        console.log(`${file.name} 上传失败`, res)
      },
    }

    editorConfig2.MENU_CONF['uploadImage']={
      server: 'http://localhost:8081/processedimg.php',

      fieldName: 'file',
      maxFileSize: 30 * 1024 * 1024,  //30MB
      maxNumberOfFiles: 1,  //最多上传一个
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],  //设置图片类型
      base64:false,
      
      onBeforeUpload(file){
        console.log(file);
        return file
      },
      onError(file, err, res) {               
        console.log(`${file.name} 上传出错`, err, res)
      },
      onFailed(file, res) {           
        console.log(`${file.name} 上传失败`, res)
      },
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()

        const editor2 = editorRef2.value
        if (editor2 == null) return
        editor2.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const handleCreated2 = (editor) => {
      editorRef2.value = editor // 记录 editor 实例，重要！
    }

    const upload = ref()

    const handleExceed = (files) => {
      upload.value.clearFiles()
      const file = files[0]
      file.uid = genFileId()
      upload.value.handleStart(file)
    }        
    
    return {
      editorRef,
      mode: 'default', 
      toolbarConfig,
      editorConfig,
      handleCreated,
      customParseLinkUrl,

      //2
      editorRef2,
      editorConfig2,
      handleCreated2,
      toolbarConfig2,
      handleExceed,
      upload
    };
  },
  data () {
    return {
      textarea:'',
      title:"",
      editor1:false,
      editor2:true,
      imgurl:'',
      html1:'',
      html2:'',
    }
  },
  methods:{
    //左页内容内容的获取以及内容溢出
   getcontent(editor){
      this.html1= editor.getHtml();
      this.gethtml(this.html1)
      if (this.editor.leftoverflow) {
        this.leftprompt()
        this.leftpageoverflow(false)
      }
    },
    //右页内容
   getcontent2(editor){
    this.html2= editor.getHtml();
      this.gethtml2(this.html2)
      if (this.editor.rightoverflow) {
        this.rightprompt()
      }
   },
   //两个编辑器的菜单交替显示
    getfocus1(){
      this.editor2 = false
      this.editor1 = true
    },
    getfocus2(){
      this.editor2 = true
      this.editor1 = false
    },
    //推文内容
    gettitle(value){
      this.changetitle(value)
    },
    //vuex 数据
    ...mapMutations(['gethtml','changetitle','gethtml2','leftpageoverflow','rightpageoverflow','changedrawer']),
    ...mapActions(['submitpaper','getarticles']),
    //两页溢出时的提示
    leftprompt(){
        ElMessageBox.alert('左页内容已经接近末尾，请在左页内容写满之后将多余内容移植右页', '提示', {    
          confirmButtonText: 'OK',
        })
        .then(() => {
           ElMessage({
             type: 'info',
             message: '已关闭',
           })
        })
        .catch(() => {
           ElMessage({
             type: 'info',
             message: '已关闭',
           })
        })
    },
    rightprompt(){
        ElMessageBox.alert('右页内容已经超出最大范围，请结束书写并且调整内容', '提示', {    
          confirmButtonText: 'OK',
        })
        .then(() => {
          ElMessage({
            type: 'info',
            message: '已关闭',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已关闭',
          })
        })
        this.rightpageoverflow(false)
    },
    //封面图片的上传
    beforeImageUpload(rawFile){
      console.log(rawFile);
    if(rawFile.size / 1024 / 1024 > 10){
        ElMessage.error("单张图片大小不能超过10MB!");
        return false;
      }
      return true;
    },
    async UploadImage(files){
      let fd = new FormData()
      fd.append('file', files.raw)
        const msg = await axios.post('http://localhost:8081/processedimg.php',fd,{headers: {'Content-Type': 'multipart/form-data'}})
        this.imgurl = msg.data.data[0].url
    },
    Reupload(){
      this.imgurl = ''
    },
    //提交数据汇总
    Dataaggregation(value){
      if (this.title === '') {
        ElMessage({
             type: 'error',
             message: '文章标题不能为空哦！',
           })
      }else if (this.html1 === '') {
        ElMessage({
             type: 'error',
             message: '左页内容不能为空哦！',
           })
      }else if (this.textarea === '') {
        ElMessage({
             type: 'error',
             message: '推文内容不能为空哦！',
           })
      }else if (this.imgurl === '') {
        ElMessage({
             type: 'error',
             message: '封面图片不能为空哦！',
           })
      }else if (value === 'submit') {
        let data = {
        title:this.title,  // 文章标题
        left:this.html1,  // 左页内容
        right:this.html2, // 右页内容
        textarea: this.textarea, //推文内容
        coverimg: this.imgurl,  // 封面图片
        username : sessionStorage.getItem('Loginedname'),  // 用户名
        userid : sessionStorage.getItem('UserId'), // 用户id
        headshot : sessionStorage.getItem('headshot')  // 用户头像
       }
       this.submitpaper(data)
       this.changedrawer(false)
       this.gethtml('')
       this.gethtml2('')
       this.changetitle('')
       this.getarticles()
      }
    },
  },
  computed:{
    ...mapState(['editor'])
  }

}
</script>    

<style lang="less" scoped>
.toolbar{
  position:fixed;
  top: 0;
  z-index:1;
}
.editable{
  height: calc(100% - 40px);
	border: 1px solid #d9d9d9;
	width: 700px;
	margin: 50px auto 50px auto;
	background-color: #fff;
	box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
	border: 1px solid #e8e8e8;
  text-align: left;
}
.title-container{
   padding: 20px 0;
   border-bottom: 1px solid #e8e8e8;
   width: 600px;
   margin-left: auto;
   margin-right: auto;
   margin-top: 7px;
   padding: 13px;
}
.title{
  font-size: 20px;
  border: 0;
  outline: none;
  width: 600px;
  height: 20px;
  resize: none;
  overflow: hidden;
  padding: 5px 5px; 
  font-weight: bold;
}
.ditor{
  padding: 5px 5px;
  margin-left: 40px;
  min-height:900px;
  font-size: 17px;
  width: 620px;
  height: 100%;
}
.separated{
  border-bottom: 1px solid #e8e8e8;
  width: 600px;
   margin-left: auto;
   margin-right: auto;
}
.disposition{
  border: 1px solid #d9d9d9;
  height: 300px;
  width: 700px;
  margin: 50px auto 50px auto;
  background-color: #fff;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
	border: 1px solid #e8e8e8;
  position:relative;
}
.label{
  position:absolute;
  left:20px;
  top:24px;
  font-size:16px;
  font-weight: bold;
}
.elinput{
  width: 550px;
  position:absolute;
  left:100px;
  top:22px;
}
.el-upload{
  position:absolute;
  top: 130px;
  left: 100px;
}
.label2{
  position:absolute;
  left:30px;
  top:130px;
  font-size:16px;
  font-weight: bold;
}
.icon{
  width: 40px;
  height: 40px;
}
.button{
  width: 800px;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
}
.btn{
  font-weight: bold;
}
.img{
  width: 148px;
  height: 148px;
  position:absolute;
  top: 130px;
  left: 100px;
}
.icon2{
  width: 40px;
  height: 40px;
  position:absolute;
  top: 240px;
  left: 250px;
}
</style>