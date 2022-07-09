import myx from "../../helper/myx";

Page({
  data: {
    productsInCart: "",
    product: "",
  },
  async onLoad() {
    const res = await myx.getStorage({
      key: "cart",
    });
    console.log(res.data);
    this.setData({ productsInCart: res.data });

    // my.alert({ content: res.errorMessage });
  },
  onReady() {
    this.setData({ productsInCart: productsCart });
  },
  onShow() {},
  onHide() {},
  onUnload() {},
});
