import {
  getProductDetails,
  getProductsAPI,
  getProductsSearchAPI,
} from "../../services";
import { navigate, parseQuery } from "../../utils/navigate";
import { loadCartIcon } from "../../utils/cart";
import myx from "../../utils/myx";

const sellerId = getApp().sellerId;

Page({
  data: {
    product: {},
    items: [
      {
        label: "0%",
        sub: 'Start',
      },
      {
        label: "5%",
        sub: '50/200',
      },
      {
        label: "7%",
        sub: '100/200',
      },
      {
        label: "10%",
        sub: 'End',
      },
    ],
    activeIndex: 1,
    failIndex: 1,
    number: 0,
    size: 0,
    showNumberSteps: true,
    relativeProducts: [],
    onTapStep(e) {
      my.alert({ content: "you tapped step " + e.target.dataset.step });
    },
    toast: {
      type: "success",
      isShow: false,
      content: "",
    },
    selectedProduct: {},
  },

  async loadData(product_id, spid) {
    this.setData({
      isLoading: true,
    });
    try {
      const productDetail = await getProductDetails({ id: product_id });
      this.setData({ product: productDetail });
      const relativeProductsInCategoryPromise = getProductsAPI({
        sellerId,
        limit: 4,
        categoryId: product.categories.id,
      });

      const relativeProductsSameNamePromise = getProductsSearchAPI({
        sellerId,
        limit: 4,
        keyword: product.name.split(" ").slice(0, 3).join(" "),
      });

      const [relativeProductsInCategory, relativeProductsSameName] =
        await Promise.all([
          relativeProductsInCategoryPromise,
          relativeProductsSameNamePromise,
        ]);

      const selectedProduct =
        product.configurable_products &&
        (product.configurable_products.find((item) => item.selected) ||
          product.configurable_products[0]);

      this.setData({
        product: product,
        selectedProduct: product,
        selectedProductId: selectedProduct
          ? selectedProduct.id
          : product.current_seller.product_id,
        relativeProducts: relativeProductsInCategory.data.length
          ? relativeProductsInCategory.data
          : relativeProductsSameName.data,
        isLoading: false,
      });
    } catch {
      this.setData({
        isLoading: false,
      });
    }
  },

  async handleAddToCart() {
    let campaignID = this.data.product;
    let productID = this.data.product.productInCampaign.productId;

    try {
      // my.getStorage({
      //   key: "cart",
      //   success: function (res) {
      //     const findIndex = res.data.findIndex(
      //       (i) => i.campaignId === this.data.product.campaignId
      //     );
      //     if (findIndex != -1) {
      //       res[findIndex].orderItems[0].quantity += number;
      //       console.log(res.data[0]);
      //     }
      //   },
      //   fail: function (res) {
      //     my.alert({ content: res.errorMessage });
      //   },
      // });
      my.setStorage({
        key: "cart",
        data: {
          campaigns: campaignID,
          quantity: this.data.number,
          productId: productID,
        },

        success: function () {
          my.alert({ content: "Saved successfully" });
        },
      });
      this.setData({
        toast: {
          isShow: true,
          type: "success",
          content: "Th??m v??o gi??? h??ng th??nh c??ng",
        },
      });
      // const { total } = await myx.getCart({ sellerId });
      // loadCartIcon({ isShowDot: total > 0 });
    } catch {
      this.setData({
        toast: {
          isShow: true,
          type: "fail",
          content: "Th??m v??o gi??? h??ng th???t b???i",
        },
      });
    }
  },

  hideToast() {
    this.setData({
      toast: {
        ...this.data.toast,
        isShow: false,
      },
    });
  },

  handleConfirmOption(selectingProduct) {
    this.setData({
      selectedProduct: selectingProduct,
      selectedProductId: selectingProduct.id,
    });
  },

  onTapProduct(product) {
    navigate({
      page: "product-detail",
      params: {
        product_id: product.campaignId,
        // spid: product.seller_product_id,
      },
    });
  },

  onhigh() {
    const num = this.data.number + 1;
    this.setData({ number: num });
  },
  onlow() {
    const num = this.data.number - 1;
    this.setData({ number: num });
  },
  toCart() {
    my.navigateTo({ url: "pages/order-detail/index" });
  },
  // Life cycle
  onLoad(query) {
    const { product_id, spid } = parseQuery(query);
    this.loadData(product_id, spid);
  },

  async loadCart() {
    try {
      const { total } = await myx.getCart({ sellerId });
      loadCartIcon({ isShowDot: total > 0 });
    } catch {
      loadCartIcon({ isShowDot: false });
    }
  },

  onShow() {
    this.loadCart();
  },

  onCustomIconEvent() {
    my.openScreen({
      screenCode: "TK_CART",
    });
  },
});


