Component({
  props: {
    title: '',
    action: 'Xem thêm',
    value: '',
    onTapActionButton: () => {},
  },

  methods: {
    _onTapActionButton() {
      this.props.onTapActionButton({
        title: this.props.title,
        value: this.props.value,
      });
    },
  },
});

module.exports = {
  theme: {
    textColor: theme => theme('colors'),
    textColor: {
      'primary': '#3490dc',
      'secondary': '#ffed4a',
       'danger': '#e3342f',
     }
  }
}
