Component({
  props: {
    className: '',
    isLoading: false,
    product: "",
    onTapProduct: () => {},
  },

  methods: {
    _onTapProduct() {
      this.props.onTapProduct(this.props.product);
    },
  },
});
