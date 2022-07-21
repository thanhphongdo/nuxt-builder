function createCmp(defineCmp, build) {
    return defineCmp({
        props: {
            msg: String,
            onClick: Function
        },
        render: function () {
            return build({
                tag: 'div',
                content: this.msg,
                events: {
                    click: (function () {
                        this.$emit('textClick', { msg: 'Clicked!!!' })
                    }).bind(this)
                }
            });
        }
    })
}