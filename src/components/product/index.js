Component({
  props: {
    className: '',
    isLoading: false,
    product: {
      name: '',
      description: '',
      status: '',
      createAt: '',
      campaignStartAt: '',
      campaignEndAt: '',
      updateAt: '',
      total: 0,
      imageUrl:""|null,
      currentProductNum: 0,
      campaignPriceLevels: [],
      productInCampaign: {
        productInCampaignId: '',
        createAt: '',
        updateAt: '',
        status: '',
        price: 0,
        quantity: 0,
        campaignId: '',
        productId: '',
        product: {
          productId: '',
          name: '',
          description: 0,
          quantity: 0,
          createAt: '',
          updateAt: '',
          status: '',
          imageUrl: '',
          categoryId: '',
          parentProductId: '',
          userId: ''
        }
      }
    },
    productInCampaign: {
      productInCampaignId: '',
      createAt: '',
      updateAt: '',
      status: '',
      price: 0,
      quantity: 0,
      campaignId: '',
      productId: '',
      product: {
        productId: '',
        name: '',
        description: 0,
        quantity: 0,
        createAt: '',
        updateAt: '',
        status: '',
        imageUrl: '',
        categoryId: '',
        parentProductId: '',
        userId: ''
      }
    },
    onTapProduct: () => {},
  },

  methods: {
    _onTapProduct() {
      this.props.onTapProduct(this.props.product);
    },
  },
});
