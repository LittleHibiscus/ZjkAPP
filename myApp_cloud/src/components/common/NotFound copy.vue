<template>
  <div id="qrCode" ref="qrCodeDiv"></div>
</template>

<script>
  import QRCode from 'qrcodejs2';
  export default {
    name: "qrCode",
    data() {
      return {}
    },
    mounted: function () {
      this.$nextTick(function () {
        this.bindQRCode();
      })
    },
    methods: {
      bindQRCode: function () {
        new QRCode(this.$refs.qrCodeDiv, {
        //   text: 'https://www.baidu.com',
          text: '敬请期待',
          width: 200,
          height: 200,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
        })
      }
    }
  }
</script>